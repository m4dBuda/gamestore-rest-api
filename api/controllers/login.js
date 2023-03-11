const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const strings = require('../helpers/strings');
const helpers = require('../helpers/helpers');

const Usuarios = require('../models/usuarios');

async function validarUsuarioLogin(res, senha, usuario) {
  try {
    const result = await bcrypt.compare(senha, usuario.senha);

    if (result === false) {
      return res.status(401).send({ error: 'Senha incorreta.' });
    }

    if (result === true) {
      const token = jwt.sign(
        {
          login: usuario.login,
        },
        strings.JWT_KEY,
        {
          expiresIn: '2 days',
        },
      );

      const sequelizeInstance = helpers.getSequelize();

      await Usuarios(sequelizeInstance).update(
        {
          usuario_logado: true,
        },
        {
          where: {
            id: usuario.id,
          },
        },
      );

      return res.status(200).send({
        mensagem: 'Login realizado com sucesso',
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          token,
        },
      });
    }
  } catch (error) {
    return res.status(400).send({ error: error });
  }
}

async function compararSenhas(senhaBody, usuario) {
  const boolean = await bcrypt.compare(senhaBody, usuario.senha);
  return boolean;
}

module.exports = {
  login: async (req, res) => {
    try {
      const { query, body } = req;

      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(body.email)) {
        return res.status(400).send({ error: 'Formato de e-mail inválido' });
      }

      if (body.senha.length < 6) {
        return res.status(400).send({ error: 'A senha deve ter no mínimo 6 caracteres.' });
      }

      const usuarioLogin = await Usuarios(sequelizeInstance).findOne({
        where: {
          email: body.email,
          ativo: 1,
        },
      });

      if (!usuarioLogin) {
        return res
          .status(400)
          .send({ error: 'Não há nenhuma conta cadastrada com o e-mail informado' });
      }

      await validarUsuarioLogin(res, body.senha, usuarioLogin);
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  alterarSenha: async (req, res) => {
    try {
      const { body, params } = req;

      const sequelizeInstance = helpers.getSequelize();

      if (body.nova_senha.length < 6) {
        return res.status(400).send({ error: 'A senha deve ter pelo menos 6 caracteres' });
      }

      const usuario = await Usuarios(sequelizeInstance).findOne({
        where: {
          id: params.id,
          ativo: 1,
        },
      });

      if (!usuario) {
        return res.status(400).send({ error: 'Usuário não encontrado ou inativo' });
      }

      const validarSenhas = await compararSenhas(body.senha, usuario);

      if (!validarSenhas) {
        return res.status(401).send({ error: `Senha atual incorreta!` });
      }

      if (body.senha === body.nova_senha) {
        return res
          .status(400)
          .send({ mensagem: `Você não pode usar a mesma senha! Escolha uma nova senha.` });
      }

      const hashNovaSenha = await bcrypt.hash(body.nova_senha, 12);

      await Usuarios(sequelizeInstance).update(
        {
          senha: hashNovaSenha,
          alterado_em: new Date(),
        },
        {
          where: {
            id: params.id,
          },
        },
      );
      return res.status(200).send({ message: `Senha alterada com sucesso!` });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  logoff: async (req, res) => {
    try {
      const { params } = req;

      const sequelizeInstance = helpers.getSequelize();

      const usuario = await Usuarios(sequelizeInstance).findOne({
        where: {
          id: params.id,
        },
      });

      if (!usuario) {
        return res.status(400).send({ error: 'Usuário não encontrado' });
      }

      await Usuarios(sequelizeInstance).update(
        {
          usuario_logado: 0,
        },
        {
          where: {
            id: usuario.id,
          },
        },
      );

      return res.status(200).send({
        mensagem: `Logoff realizado com sucesso!`,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
        },
      });
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  },
};
