const { Sequelize } = require('sequelize');

const Carrinhos = require('../models/carrinhos');
const helpers = require('../helpers/helpers');
const dbHelpers = require('../helpers/db_helpers');
const strings = require('../helpers/strings');

module.exports = {
  create: async (req, res) => {
    try {
      const { body, query } = req;

      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      const carrinhoFinalizado = await dbHelpers.isCarrinhoFinalizado(req, query.forcar);

      if (!carrinhoFinalizado) {
        return res.status(400).send({ error: `Já existe um carrinho ativo para este usuário!` });
      }

      if (carrinhoFinalizado) {
        const carrinho = await Carrinhos(sequelizeInstance).create({
          id_produtos: body.id_produtos,
          id_usuario: body.id_usuario,
        });

        return res.status(200).send({ mensagem: `Carrinho criado com sucesso!`, id: carrinho.id });
      }
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  getAll: async (req, res) => {
    try {
      const { query } = req;

      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      const carrinhos = await Carrinhos(sequelizeInstance, strings.VIEW_CARRINHOS).findAll();

      return res.status(200).send(carrinhos || { error: `Não há carrinhos para visualizar.` });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  getById: async (req, res) => {
    try {
      const { params, query } = req;

      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      const carrinho = await Carrinhos(sequelizeInstance, strings.VIEW_CARRINHOS).findOne({
        where: {
          id_usuario: params.id,
          ativo: 1,
          finalizado: 0,
        },
      });

      await dbHelpers.getProdutosCarrinho(carrinho, req);

      return res.status(200).send(carrinho || { error: `Carrinho não encontrado` });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  update: async (req, res) => {
    try {
      const { body, query, params } = req;

      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      await Carrinhos(sequelizeInstance).update(
        {
          id_produtos: body.id_produtos,
          finalizado: body.finalizado,
          alterado_em: new Date(),
        },
        {
          where: {
            id: params.id,
          },
        },
      );

      return res.status(200).send(
        { mensagem: `Carrinho atualizado com sucesso!` } || {
          mensagem: `Carrinho não encontrado`,
        },
      );
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  delete: async (req, res) => {
    try {
      const { params, query } = req;

      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      const carrinho = await Carrinhos(sequelizeInstance).findOne({
        where: { id: params.id },
      });

      if (!carrinho) {
        return res.status(404).send({ mensagem: `Carrinho não encontrado!` });
      }

      if (carrinho) {
        const novoEstadoCarrinho = dbHelpers.updateEstado(carrinho);

        await Carrinhos(sequelizeInstance).update(
          {
            ativo: novoEstadoCarrinho.estado,
            alterado_em: new Date(),
          },
          {
            where: {
              id: params.id,
            },
          },
        );

        return res
          .status(200)
          .send({ mensagem: `Carrinho ${novoEstadoCarrinho.novoEstado} com sucesso!` });
      }
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
};
