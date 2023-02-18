const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const Usuarios = require('../models/usuarios');
const helpers = require('../helpers/helpers');

async function compararSenhas(senha, usuario) {
  const boolean = await bcrypt.compare(senha, usuario.senha);
  return boolean;
}

module.exports = {
  login: async (req, res) => {
    try {
      const { query, body, params } = req;

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

      const senhasConferem = await compararSenhas(body.senha, usuarioLogin);
      if (!senhasConferem) {
        return res.status(401).send({ error: 'Senha incorreta.' });
      }

      return res
        .status(200)
        .send({ message: `Login para ${usuarioLogin.email} realizado com sucesso!` });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  alterarSenha: async (req, res) => {
    try {
      const { query, body, params } = req;

      const sequelizeInstance = helpers.getSequelize(query.nomedb);

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
};
