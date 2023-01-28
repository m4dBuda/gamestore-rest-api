const { Sequelize } = require('sequelize');
const helpers = require('../helpers/helpers');
const dbHelpers = require('../helpers/db_helpers');
const TipoProdutos = require('../models/tipo_produtos');

module.exports = {
  /*
  URL: http://localhost:13700/tipo_produtos?nomedb=db_first_store
  Método: POST
  Body esperado:  
  
  {
    "descricao": "Campanha"
  }
  */

  async create(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const tipoProdutos = await TipoProdutos(sequelize, Sequelize.DataTypes).create({
        descricao: req.body.descricao,
      });

      res
        .status(200)
        .send({
          mensagem: `Tipo produto ${tipoProdutos.descricao} cadastrado com sucesso`,
          id: tipoProdutos.id,
        });
    } catch (error) {
      res.status(500).send({ error });
    } finally {
      sequelize.close();
    }
  },

  /*
  URL: http://localhost:13700/tipo_produtos?nomedb=db_first_store
  Método: GET
  */
  async getAll(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const tipoProduto = await TipoProdutos(sequelize, Sequelize.DataTypes).findAll();

      if (req.query.relacionar_usuario == true) {
        await dbHelpers.getUsuarioByCriadoPorLista(tipoProduto, req);
      }
      res.status(200).send(tipoProduto || { error: `Tipo produto não encontrado ou não existe.` });
    } catch (error) {
      res.status(500).send({ error });
    } finally {
      sequelize.close();
    }
  },

  /*
  URL: http://localhost:13700/tipo_produtos/1?nomedb=db_first_store
  Método: GET
  */
  async getById(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const { id } = req.params;
      const tipoProduto = await TipoProdutos(sequelize, Sequelize.DataTypes).findOne({
        where: {
          id,
        },
      });
      res.status(200).send(tipoProduto || { error: `Tipo produto não encontrado ou não existe.` });
    } catch (error) {
      res.status(500).send({ error });
    } finally {
      sequelize.close();
    }
  },

  /*
  URL: http://localhost:13700/tipo_produtos/1?nomedb=db_first_store
  Método: PUT
  */
  async update(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const { id } = req.params;

      await TipoProdutos(sequelize, Sequelize.DataTypes).update(
        {
          descricao: req.body.descricao,
          alterado_por_id_usuario: req.body.alterado_por_id_usuario,
          alterado_em: new Date(),
        },
        {
          where: {
            id,
          },
        },
      );
      res.status(200).send(
        { mensagem: `Tipo Produto atualizado com sucesso` } || {
          mensagem: 'Tipo Produto não encontrado',
        },
      );
    } catch (error) {
      res.status(500).send({ error });
    } finally {
      sequelize.close();
    }
  },

  /*
  URL: http://localhost:13700/tipo_produtos/1?nomedb=db_first_store
  Método: DELETE
  */
  async delete(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const { id } = req.params;

      const tipoProduto = await TipoProdutos(sequelize, Sequelize.DataTypes).findOne({
        where: { id },
      });

      if (tipoProduto) {
        let estado;
        let novoEstado;
        if (tipoProduto.ativo == 0) {
          estado = 1;
          novoEstado = 'ativado';
        }
        if (tipoProduto.ativo == 1) {
          estado = 0;
          novoEstado = 'inativado';
        }

        await TipoProdutos(sequelize, Sequelize.DataTypes).update(
          {
            ativo: estado,
            alterado_em: new Date(),
          },
          { where: { id } },
        );

        res.status(200).send({ mensagem: `Tipo produto ${novoEstado} com sucesso!` });
      } else {
        res.status(404).send({ mensagem: `Tipo Produto não encontrado!` });
      }
    } catch (error) {
      res.status(500).send({ error });
    } finally {
      sequelize.close();
    }
  },
};
