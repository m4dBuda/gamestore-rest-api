const { Sequelize, Op } = require('sequelize');
const validator = require('validator');
const Produtos = require('../models/produtos');
const Usuarios = require('../models/usuarios');
const helpers = require('../helpers/helpers');
const dbHelpers = require('../helpers/db_helpers');
const strings = require('../helpers/strings');

function getFiltro(query) {
  const filtro = {
    where: {
      ativo: 1,
    },
    limit: 20,
  };

  if (query.nome_produto) {
    filtro.where['nome_produto'] = { [Op.like]: `%${query.nome_produto}%` };
  }

  if (query.rating) {
    filtro.where['rating'] = query.rating;
  }

  if (query.ativo) {
    filtro.where['ativo'] = query.ativo;
  }

  if (query.preco) {
    filtro.where['preco'] = { [Op.eq]: query.preco };
  }

  return filtro;
}

module.exports = {
  getAll: async (req, res) => {
    try {
      const { query } = req;

      const sequelizeInstance = helpers.getSequelize();

      const products = await Produtos(sequelizeInstance, strings.VIEW_PRODUTOS).findAll(
        getFiltro(query),
      );

      return res.status(200).send(products || { message: `Produto não encontrado!` });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  getById: async (req, res) => {
    try {
      const { params } = req;

      const sequelizeInstance = helpers.getSequelize();

      const product = await Produtos(sequelizeInstance, strings.VIEW_PRODUTOS).findOne({
        where: {
          id: params.id,
        },
      });

      return res.status(200).send(product || { message: `Produto não encontrado!` });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  create: async (req, res) => {
    try {
      const { body } = req;

      const sequelizeInstance = helpers.getSequelize();

      if (!validator.isLength(body.nome_produto, { min: 8, max: 40 })) {
        return res.status(400).send({ message: 'O nome do produto é inválido' });
      }

      if (!validator.isLength(body.descricao_produto, { min: 10, max: 255 })) {
        return res
          .status(400)
          .send({ message: 'É necessário informar uma descrição para o produto criado' });
      }

      const product = await Produtos(sequelizeInstance).create({
        nome_produto: body.nome_produto,
        descricao_produto: body.descricao_produto,
        quantidade: body.quantidade,
        preco: body.preco,
        rating: body.rating,
        caminho_imagem: body.caminho_imagem,
        id_usuario: body.id_usuario,
        id_tipo_produto: body.id_tipo_produto,
      });

      return res.status(200).send({ message: `Produto registrado com sucesso!`, id: product.id });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  update: async (req, res) => {
    try {
      const { params, body } = req;

      const sequelizeInstance = helpers.getSequelize();

      const product = await Produtos(sequelizeInstance, strings.VIEW_PRODUTOS).findOne({
        where: {
          id: params.id,
        },
      });

      if (!product) {
        return res.status(400).send({ error: 'Produto não encontrado' });
      }

      await Produtos(sequelizeInstance).update(
        {
          nome_produto: body.nome_produto,
          descricao_produto: body.descricao_produto,
          quantidade: body.quantidade,
          preco: body.preco,
          rating: body.rating,
          caminho_imagem: body.imagem,
          id_tipo_produto: body.id_tipo_produto,
          alterado_em: new Date(),
          id_usuario: body.id_usuario,
        },
        {
          where: { id: params.id },
        },
      );

      res.status(200).send({ message: `Produto editado com sucesso!` });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  delete: async (req, res) => {
    try {
      const { params, body } = req;

      const sequelizeInstance = helpers.getSequelize();

      const user = await Usuarios(sequelizeInstance, strings.VIEW_USUARIOS).findOne({
        where: {
          id: body.id_usuario,
        },
      });

      if (user.tipo_conta !== strings.ADMIN) {
        return res.status(400).send({
          error: `Apenas administradores com permissão pode ativar/inativar produtos`,
        });
      }

      const product = await Produtos(sequelizeInstance, strings.VIEW_PRODUTOS).findOne({
        where: { id: params.id },
      });

      if (!product) {
        return res.status(400).send({ error: 'Produto não encontrado' });
      }

      if (product) {
        var novoEstadoProduto = dbHelpers.updateEstado(product);
      }

      await Produtos(sequelizeInstance).update(
        {
          ativo: novoEstadoProduto.estado,
          alterado_em: new Date(),
          id_usuario: body.id_usuario,
        },
        {
          where: {
            id: params.id,
          },
        },
      );

      return res.status(200).send({
        message: `Produto ${product.nome_produto} ${novoEstadoProduto.novoEstado} com sucesso`,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
