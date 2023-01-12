const { Sequelize, Op } = require('sequelize');
const Produtos = require('../models/produtos');
const helpers = require('../helpers/helpers');

function getFiltro(req) {
  jsonObj = {
    where: {
      ativo: 1,
    },
  };

  if (req.query.nome) {
    jsonObj.where['nome'] = {
      [Op.like]: `%${req.query.nome}%`,
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
      const produto = await Produtos(sequelize, Sequelize.DataTypes).findOne({
        where: {
          id: req.params.id,
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
        nome: req.body.nome,
        preco: req.body.preco,
        rating: req.body.rating,
        imagem: req.body.imagem,
        descricao: req.body.descricao,
        criado_por_id_usuario: req.body.criado_por_id_usuario,
      });

      res.status(200).send({ mensagem: `${produto.nome} registrado com sucesso!`, produto });
    } catch (error) {
      res.status(500).send(error);
    } finally {
      sequelize.close();
    }
  },

  async update(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const produto = await Produtos(sequelize, Sequelize.DataTypes).findOne({
        where: { id: req.params.id },
      });

      if (produto) {
        if (req.query.ativar == true) {
          await Produtos(sequelize, Sequelize.DataTypes).update(
            {
              ativo: 1,
            },
            {
              where: {
                id: req.params.id,
              },
            },
          );
          return res.status(200).send({ mensagem: `Produto reativado!` });
        }

        await Produtos(sequelize, Sequelize.DataTypes).update(
          {
            nome: req.body.nome,
            preco: req.body.preco,
            rating: req.body.rating,
            imagem: req.body.imagem,
            descricao: req.body.descricao,
            alterado_em: new Date(),
            alterado_por_id_usuario: req.body.alterado_por_id_usuario,
          },
          {
            where: { id: req.params.id },
          },
        );

        res.status(200).send({ mensagem: `${produto.nome} editado com sucesso!` });
      } else {
        res.status(400).send({ mensagem: `Produto não encontrado ou desativado.` });
      }
    } catch (error) {
      res.status(500).send(error);
    } finally {
      sequelize.close();
    }
  },

  async delete(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const produto = await Produtos(sequelize, Sequelize.DataTypes).findOne({
        where: { id: req.params.id, ativo: 1 },
      });

      if (produto) {
        await Produtos(sequelize, Sequelize.DataTypes).update(
          {
            ativo: 0,
            alterado_em: new Date(),
            alterado_por_id_usuario: req.body.alterado_por_id_usuario,
          },
          {
            where: {
              id: req.params.id,
            },
          },
        );
        res.status(200).send({ mensagem: `${produto.nome} desativado com sucesso!`, produto });
      } else {
        res.status(400).send({ mensagem: `Produto não encontrado ou já está desativado!` });
      }
    } catch (error) {
      res.status(500).send(error);
    } finally {
      sequelize.close();
    }
  },
};
