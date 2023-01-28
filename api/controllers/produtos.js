const { Sequelize, Op } = require('sequelize');
const Produtos = require('../models/produtos');
const helpers = require('../helpers/helpers');
const dbHelpers = require('../helpers/db_helpers');

// Função para receber filtros na Query e adicionar no WHERE CLAUSE do método	getAll e getById
function getFiltro(req) {
  jsonObj = {
    where: {
      ativo: 1,
    },
  };

  if (req.query.nome_produto) {
    jsonObj.where['nome_produto'] = {
      [Op.like]: `%${req.query.nome_produto}%`,
    };
  }

  if (req.query.rating) {
    jsonObj.where['rating'] = req.query.rating;
  }

  if (req.query.ativo) {
    jsonObj.where['ativo'] = req.query.ativo;
  }

  if (req.query.preco) {
    jsonObj.where['preco'] = {
      [Op.eq]: req.query.preco,
    };
  }

  return jsonObj;
}

module.exports = {
  /*
  URL: http://localhost:13700/produtos?nomedb=db_first_store
  Método: GET
  */
  async getAll(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const produtos = await Produtos(sequelize, Sequelize.DataTypes, 'view_produtos').findAll(
        getFiltro(req),
      );

      res.status(200).send(produtos || { mensagem: `Produto não encontrado!` });
    } catch (error) {
      res.status(500).send({ error });
    } finally {
      sequelize.close();
    }
  },

  /*
  URL: http://localhost:13700/produtos/1?nomedb=db_first_store
  Método: GET
  */
  async getById(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const { id } = req.params;
      const produto = await Produtos(sequelize, Sequelize.DataTypes, 'view_produtos').findOne({
        where: {
          id,
        },
      });

      res.status(200).send(produto || { mensagem: `Produto não encontrado!` });
    } catch (error) {
      res.status(500).send(error);
    } finally {
      sequelize.close();
    }
  },

  /*
  URL: http://localhost:13700/produtos?nomedb=db_first_store
  Método: POST
  
  Body esperado para criar um produto
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
  async create(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const produto = await Produtos(sequelize, Sequelize.DataTypes).create({
        nome_produto: req.body.nome_produto,
        descricao_produto: req.body.descricao_produto,
        quantidade: req.body.quantidade,
        preco: req.body.preco,
        rating: req.body.rating,
        caminho_imagem: req.body.imagem,
        id_usuario: req.body.id_usuario,
        id_tipo_produto: req.body.id_tipo_produto,
      });

      res.status(200).send({ mensagem: `Produto registrado com sucesso!`, id: produto.id });
    } catch (error) {
      res.status(500).send(error);
    } finally {
      sequelize.close();
    }
  },

  /*
  URL: http://localhost:13700/produtos/1?nomedb=db_first_store
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
  async update(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const { id } = req.params;
      const produto = await Produtos(sequelize, Sequelize.DataTypes).update(
        {
          nome_produto: req.body.nome_produto,
          descricao_produto: req.body.descricao_produto,
          quantidade: req.body.quantidade,
          preco: req.body.preco,
          rating: req.body.rating,
          caminho_imagem: req.body.imagem,
          id_tipo_produto: req.body.id_tipo_produto,
          alterado_em: new Date(),
          id_usuario: req.body.id_usuario,
        },
        {
          where: { id },
        },
      );

      res.status(200).send(
        { mensagem: `Produto editado com sucesso!` } || {
          mensagem: `Produto não encontrado`,
        },
      );
    } catch (error) {
      res.status(500).send(error);
    } finally {
      sequelize.close();
    }
  },

  /*
  URL: http://localhost:13700/produtos/1?nomedb=db_first_store
  Método: DELETE
  */
  async delete(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const { id } = req.params;

      const produto = await Produtos(sequelize, Sequelize.DataTypes).findOne({
        where: { id },
      });

      if (produto) {
        let estado;
        let novoEstado;
        if (produto.ativo == 0) {
          estado = 1;
          novoEstado = 'ativado';
        }
        if (produto.ativo == 1) {
          estado = 0;
          novoEstado = 'inativado';
        }

        await Produtos(sequelize, Sequelize.DataTypes).update(
          {
            ativo: estado,
            alterado_em: new Date(),
            id_usuario: req.body.id_usuario,
          },
          {
            where: {
              id,
            },
          },
        );
        res.status(200).send({ mensagem: `Produto ${novoEstado} com sucesso` });
      } else {
        res.status(400).send({ mensagem: `Produto não encontrado` });
      }
    } catch (error) {
      res.status(500).send(error);
    } finally {
      sequelize.close();
    }
  },
};
