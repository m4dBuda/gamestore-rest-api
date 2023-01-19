const { Sequelize, where } = require('sequelize');
const Carrinho = require('../models/carrinho');
const helpers = require('../helpers/helpers');

module.exports = {
  async create(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const carrinho = await Carrinho(sequelize, Sequelize.DataTypes).create({
        id_produtos: req.body.id_produtos,
        id_usuario: req.body.id_usuario,
      });

      res.status(200).send({ mensagem: `Carrinho criado com sucesso!`, carrinho });
    } catch (error) {
      res.status(500).send({ error });
    } finally {
      sequelize.close();
    }
  },
  async getAll(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const carrinho = await Carrinho(sequelize, Sequelize.DataTypes).findAll();

      res.status(200).send(carrinho || { error: `Não há carrinhos para visualizar.` });
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

      const carrinho = await Carrinho(sequelize, Sequelize.DataTypes).findOne({
        where: {
          id_usuario: id,
        },
      });

      res.status(200).send(carrinho || { error: `Carrinho não encontrado` });
    } catch (error) {
      res.status(500).send({ error });
    } finally {
      sequelize.close();
    }
  },
  async update(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const { id } = req.params;

      const carrinho = await Carrinho(sequelize, Sequelize.DataTypes).update(
        {
          id_produtos: req.body.id_produtos,
          finalizado: req.body.finalizado,
          alterado_em: new Date(),
        },
        {
          where: {
            id,
          },
        },
      );
      res.status(200).send(
        { mensagem: `Carrinho atualizado com sucesso!` } || {
          mensagem: `Carrinho não encontrado`,
        },
      );
    } catch (error) {
      res.status(500).send({ error });
    } finally {
      sequelize.close();
    }
  },
  async delete(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const { id } = req.params;

      const carrinho = await Carrinho(sequelize, Sequelize.DataTypes).findOne({
        where: { id },
      });

      if (carrinho) {
        let estado;
        let novoEstado;
        if (carrinho.ativo == 0) {
          estado = 1;
          novoEstado = 'finalizado';
        }
        if (carrinho.ativo == 1) {
          estado = 0;
          novoEstado = 'reativado';
        }

        await Carrinho(sequelize, Sequelize.DataTypes).update(
          {
            finalizado: estado,
            alterado_em: new Date(),
          },
          {
            where: {
              id,
            },
          },
        );
        res.status(200).send({ mensagem: `Carrinho ${novoEstado} com sucesso!` });
      } else {
        res.status(404).send({ mensagem: `Carrinho não encontrado!` });
      }
    } catch (error) {
      res.status(500).send({ error });
    } finally {
      sequelize.close();
    }
  },
};
