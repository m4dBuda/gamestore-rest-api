const { Sequelize, Op } = require('sequelize');
const Produtos = require('../models/produtos');
const Usuarios = require('../models/usuarios');
const helpers = require('../helpers/helpers');
const dbHelpers = require('../helpers/db_helpers');
const strings = require('../helpers/strings');
const validator = require('validator');
const produtos = require('../models/produtos');

// Função para receber filtros na Query e adicionar no WHERE CLAUSE do método	getAll e getById
function getFiltro(query) {
  const filtro = {
    where: {
      ativo: 1,
    },
  };

  if (query.nome_produto) {
    filtro.where['nome_produto'] = {
      [Op.like]: `%${query.nome_produto}%`,
    };
  }

  if (query.rating) {
    filtro.where['rating'] = query.rating;
  }

  if (query.ativo) {
    filtro.where['ativo'] = query.ativo;
  }

  if (query.preco) {
    filtro.where['preco'] = {
      [Op.eq]: query.preco,
    };
  }

  return filtro;
}

module.exports = {
  /*
  URL: http://localhost:13700/produtos?nomedb=db_first_store
  Método: GET
  */
  getAll: async (req, res) => {
    try {
      // Desestruturando o objeto query na variável "query"
      const { query } = req;

      // Obtendo a instância do Sequelize a partir do nome do banco de dados
      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      // Obtendo todos os produtos com base no filtro especificado
      const products = await Produtos(sequelizeInstance, strings.VIEW_PRODUTOS).findAll(
        getFiltro(query),
      );
      // Enviando a resposta com os produtos encontrados ou mensagem de erro
      return res.status(200).send(products || { message: `Produto não encontrado!` });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  /*
  URL: http://localhost:13700/produtos/:id?nomedb=db_first_store
  Método: GET
  */
  getById: async (req, res) => {
    try {
      // Desestruturando o objeto query e params na variável "query" e "params" respectivamente
      const { query, params } = req;

      // Obtendo a instância do Sequelize a partir do nome da base de dados
      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      // Obtendo o produto com base no ID especificado
      const product = await Produtos(sequelizeInstance, strings.VIEW_PRODUTOS).findOne({
        where: {
          id: params.id,
        },
      });
      // Enviando a resposta com o produto encontrado ou mensagem de erro
      return res.status(200).send(product || { message: `Produto não encontrado!` });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  /*
  URL: http://localhost:13700/produtos?nomedb=db_first_store
  Método: POST
  Body:
      {
        "nome_produto": "God of War - Ragnarok",
        "descricao_produto": "Lançado em 2022, ganhador do premio XBOX",
        "preco": "R$279,90",
        "rating": "10",
        "quantidade": 15,
        "caminho_imagem": "https://pt.wikipedia.org/wiki/Node.js#/media/Ficheiro:Node.js_logo.svg",
        "id_usuario": 3,
        "id_tipo_produto": 3
      }
 */
  create: async (req, res) => {
    try {
      // Desestruturando o objeto query e body na variável "query" e "body" respectivamente
      const { query, body } = req;

      // Obtendo a instância do Sequelize a partir do nome da base de dados
      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      // Validações de campos
      if (!validator.isLength(body.nome_produto, { min: 8, max: 40 })) {
        return res.status(400).send({ message: 'O nome do produto é inválido' });
      }

      if (!validator.isLength(body.descricao_produto, { min: 10, max: 255 })) {
        return res
          .status(400)
          .send({ message: 'É necessário informar uma descrição para o produto criado' });
      }

      // Criando o produto
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

      // Enviando a resposta com o id do produto criado.
      return res.status(200).send({ message: `Produto registrado com sucesso!`, id: product.id });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  /*
  URL: http://localhost:13700/produtos/:id?nomedb=db_first_store
  Método: PUT
  
  Body esperado para editar um produto
      {
        "nome_produto": "God of War - Ragnarok",
        "descricao_produto": "Lançado em 2022, ganhador do premio XBOX",
        "preco": "R$279,90",
        "rating": "10",
        "quantidade": 15,
        "caminho_imagem": "https://pt.wikipedia.org/wiki/Node.js#/media/Ficheiro:Node.js_logo.svg",
        "id_usuario": 3,
        "id_tipo_produto": 3
      }
 */
  update: async (req, res) => {
    try {
      // Desestruturando o objeto query e body na variável "query" e "body" respectivamente
      const { params, query, body } = req;

      // Obtendo a instância do Sequelize a partir do nome da base de dados
      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      // Obtendo o produto com base no ID especificado
      const product = await Produtos(sequelizeInstance, strings.VIEW_PRODUTOS).findOne({
        where: {
          id: params.id,
        },
      });

      if (!product) {
        return res.status(400).send({ error: 'Produto não encontrado' });
      }

      // Atualizando o produto.
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

  /*
  URL: http://localhost:13700/produtos/:id?nomedb=db_first_store
  Método: DELETE
  */
  delete: async (req, res) => {
    try {
      // Desestruturando o objeto da requisição
      const { params, query, body } = req;

      // Obtendo a instância do Sequelize a partir do nome da base de dados
      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      // Buscando o usuário para verificar se há permissão para realizar tal ação
      const user = await Usuarios(sequelizeInstance, strings.VIEW_USUARIOS).findOne({
        where: {
          id: body.id_usuario,
        },
      });

      // Validando se o usuário tem permissão de ADMIN
      if (user.tipo_conta !== strings.ADMIN) {
        return res.status(400).send({
          error: `Apenas administradores e operadores com permissão pode ativar/inativar produtos`,
        });
      }

      // Buscando o produto
      const product = await Produtos(sequelizeInstance, strings.VIEW_PRODUTOS).findOne({
        where: { id: params.id },
      });

      if (!product) {
        return res.status(400).send({ error: 'Produto não encontrado' });
      }

      // Validando estado e novo estado do produto encontrado.
      if (product) {
        var novoEstadoProduto = dbHelpers.updateEstado(product);
      }

      // Atualizando o estado do produto
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
