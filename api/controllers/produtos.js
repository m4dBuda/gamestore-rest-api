const { Sequelize, Op } = require('sequelize');
const Produtos = require('../models/produtos');
const helpers = require('../helpers/helpers');

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
  async getAll(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const produtos = await Produtos(sequelize, Sequelize.DataTypes).findAll(getFiltro(req));

      res.status(200).send(produtos || { mensagem: `Produto não encontrado!` });
    } catch (error) {
      res.status(500).send({ error });
    } finally {
      sequelize.close();
    }
  },

  async getById(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const { id } = req.params;
      const produto = await Produtos(sequelize, Sequelize.DataTypes).findOne({
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
        criado_por_id_usuario: req.body.criado_por_id_usuario,
        id_tipo_produto: req.body.id_tipo_produto,
      });

      res.status(200).send({ mensagem: `Produto registrado com sucesso!`, produto });
    } catch (error) {
      res.status(500).send(error);
    } finally {
      sequelize.close();
    }
  },

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
          alterado_por_id_usuario: req.body.alterado_por_id_usuario,
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
            alterado_por_id_usuario: req.body.alterado_por_id_usuario,
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
