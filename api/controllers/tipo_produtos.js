const { Sequelize } = require('sequelize');
const helpers = require('../helpers/helpers');
const dbHelpers = require('../helpers/db_helpers');
const TipoProdutos = require('../models/tipo_produtos');
const Usuarios = require('../models/usuarios');

module.exports = {
  create: async (req, res) => {
    try {
      const { body } = req;

      const sequelizeInstance = helpers.getSequelize();

      const tipoProdutos = await TipoProdutos(sequelizeInstance).create({
        descricao: body.descricao,
      });

      return res.status(200).send({
        mensagem: `Tipo produto ${tipoProdutos.descricao} cadastrado com sucesso`,
        id: tipoProdutos.id,
      });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  getAll: async (req, res) => {
    try {
      const sequelizeInstance = helpers.getSequelize();

      const tipoProduto = await TipoProdutos(sequelizeInstance).findAll({
        include: [
          {
            model: Usuarios(sequelizeInstance),
            required: true,
          },
        ],
      });

      return res
        .status(200)
        .send(tipoProduto || { error: `Tipo produto não encontrado ou não existe.` });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  getById: async (req, res) => {
    try {
      const { params } = req;

      const sequelizeInstance = helpers.getSequelize();

      const tipoProduto = await TipoProdutos(sequelizeInstance).findOne({
        where: {
          id: params.id,
        },
      });

      return res
        .status(200)
        .send(tipoProduto || { error: `Tipo produto não encontrado ou não existe.` });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  update: async (req, res) => {
    try {
      const { params, body } = req;

      const sequelizeInstance = helpers.getSequelize();

      await TipoProdutos(sequelizeInstance).update(
        {
          descricao: body.descricao,
          id_usuario: body.id_usuario,
          alterado_em: new Date(),
        },
        {
          where: {
            id: params.id,
          },
        },
      );

      return res.status(200).send(
        { mensagem: `Tipo Produto atualizado com sucesso` } || {
          mensagem: 'Tipo Produto não encontrado',
        },
      );
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  delete: async (req, res) => {
    try {
      const { params } = req;

      const sequelizeInstance = helpers.getSequelize();

      const tipoProduto = await TipoProdutos(sequelizeInstance).findOne({
        where: { id: params.id },
      });

      if (!tipoProduto) {
        return res.status(400).send({ error: 'Tipo produto não encontrado.' });
      }

      if (tipoProduto) {
        var novoEstadoTipoProduto = dbHelpers.updateEstado(tipoProduto);
      }

      await TipoProdutos(sequelizeInstance).update(
        {
          ativo: novoEstadoTipoProduto.estado,
          alterado_em: new Date(),
        },
        { where: { id: tipoProduto.id } },
      );

      return res
        .status(200)
        .send({ mensagem: `Tipo produto ${novoEstadoTipoProduto.novoEstado} com sucesso!` });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
};
