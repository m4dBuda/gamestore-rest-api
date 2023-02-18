const { Sequelize } = require('sequelize');
const Usuarios = require('../models/usuarios');
const bcrypt = require('bcrypt');
const helpers = require('../helpers/helpers');
const dbHelpers = require('../helpers/db_helpers');
const strings = require('../helpers/strings');

async function verificarCpfRepetido(req) {
  const sequelize = helpers.getSequelize(req.query.nomedb);

  const isCPFCadastrado = await Usuarios(sequelize).findOne({
    where: {
      cpf: req.body.cpf,
    },
  });

  if (isCPFCadastrado) {
    return true;
  } else {
    return false;
  }
}

async function verificarEmailRepetido(req) {
  const sequelize = helpers.getSequelize(req.query.nomedb);

  const isEmailCadastrado = await Usuarios(sequelize).findOne({
    where: {
      email: req.body.email,
    },
  });

  if (isEmailCadastrado) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  getAll: async (req, res) => {
    try {
      const { query } = req;

      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      const usuarios = await Usuarios(sequelizeInstance, strings.VIEW_USUARIOS).findAll();

      return res.status(200).send(usuarios || { mensagem: `Usuário ${strings.naoEncontrado}` });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  getById: async (req, res) => {
    try {
      const { query, params } = req;

      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      const usuario = await Usuarios(sequelizeInstance, strings.VIEW_USUARIOS).findOne({
        where: {
          id: params.id,
        },
      });

      return res.status(200).send(usuario || { mensagem: `Usuário ${strings.naoEncontrado}` });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  create: async (req, res) => {
    try {
      const { body, query } = req;

      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      const checkCpf = await verificarCpfRepetido(req);
      if (checkCpf) {
        return res
          .status(401)
          .send({ error: `Este cpf já está cadastrado e vinculado a uma conta.` });
      }

      const checkEmail = await verificarEmailRepetido(req);
      if (checkEmail) {
        return res
          .status(401)
          .send({ error: `Este email já está cadastrado e vinculado a uma conta.` });
      }

      const hash = await bcrypt.hash(body.senha, 12);

      const usuario = await Usuarios(sequelizeInstance).create({
        nome: body.nome,
        cpf: body.cpf,
        senha: hash,
        email: body.email,
        data_nascimento: body.data_nascimento,
        id_tipo_usuario: body.id_tipo_usuario,
        telefone: body.telefone,
        endereco: body.endereco,
        endereco2: body.endereco2,
        cep: body.cep,
      });

      return res
        .status(200)
        .send({ mensagem: `Usuário ${strings.criadoComSucesso}`, id: usuario.id });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  update: async (req, res) => {
    try {
      const { params, body, query } = req;

      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      await Usuarios(sequelizeInstance).update(
        {
          nome: body.nome,
          email: body.email,
          data_nascimento: body.data_nascimento,
          id_tipo_usuario: body.id_tipo_usuario,
          telefone: body.telefone,
          endereco: body.endereco,
          endereco2: body.endereco2,
          cep: body.cep,
          alterado_em: new Date(),
        },
        {
          where: { id: params.id },
        },
      );

      return res.status(200).send({ mensagem: `Usuário ${strings.editadoComSucesso}` });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  delete: async (req, res) => {
    try {
      const { query, params } = req;

      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      const usuario = await Usuarios(sequelizeInstance).findOne({
        where: { id: params.id },
      });

      if (!usuario) {
        return res.status(404).send({ error: 'Usuário não encontrado' });
      }

      const novoEstadoUsuario = dbHelpers.updateEstado(usuario);

      await Usuarios(sequelizeInstance).update(
        {
          ativo: novoEstadoUsuario.estado,
          alterado_em: new Date(),
        },
        {
          where: {
            id: usuario.id,
          },
        },
      );
      return res
        .status(200)
        .send({ mensagem: `Usuário ${novoEstadoUsuario.novoEstado} com sucesso!` });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
};
