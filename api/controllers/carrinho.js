const { Sequelize, where } = require('sequelize');
const Carrinho = require('../models/carrinho');
const helpers = require('../helpers/helpers');
const dbHelpers = require('../helpers/db_helpers');

module.exports = {
  /*
  URL: http://localhost:13700/carrinho?nomedb=db_first_store
  Método: POST
  
  Body esperado para criar um carrinho
  {
    "id_usuario": 4,
    "id_produtos": "3, 3, 4, 6, 1"
  }

    Parametros: forcar (true)
      Irá desativar o último carrinho não finalizado
      e criar um novo carrinho com o body enviado.
 */
  async create(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const { forcar } = req.query;

      const validarCarrinho = await dbHelpers.isCarrinhoFinalizado(req, forcar);
      if (validarCarrinho) {
        const carrinho = await Carrinho(sequelize, Sequelize.DataTypes, 'carrinho').create({
          id_produtos: req.body.id_produtos,
          id_usuario: req.body.id_usuario,
        });

        res.status(200).send({ mensagem: `Carrinho criado com sucesso!`, carrinho });
      }
      if (!validarCarrinho) {
        res.status(200).send({ mensagem: `Já existe um carrinho ativo para este usuário!` });
      }
    } catch (error) {
      res.status(500).send({ error });
    } finally {
      sequelize.close();
    }
  },

  /*
  URL: http://localhost:13700/carrinho?nomedb=db_first_store
  Método: GET
 */
  async getAll(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const carrinhos = await Carrinho(sequelize, Sequelize.DataTypes, 'view_carrinhos').findAll();

      res.status(200).send(carrinhos || { error: `Não há carrinhos para visualizar.` });
    } catch (error) {
      res.status(500).send({ error });
    } finally {
      sequelize.close();
    }
  },

  /*
  URL: http://localhost:13700/carrinho/1?nomedb=db_first_store
  Método: GET
 */
  async getById(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const { id } = req.params;

      const carrinho = await Carrinho(sequelize, Sequelize.DataTypes, 'view_carrinhos').findOne({
        where: {
          id_usuario: id,
          finalizado: 0,
        },
      });

      await dbHelpers.getProdutosCarrinho(carrinho, req);

      res.status(200).send(carrinho || { error: `Carrinho não encontrado` });
    } catch (error) {
      res.status(500).send({ error });
    } finally {
      sequelize.close();
    }
  },

  /*
  URL: http://localhost:13700/carrinho/1?nomedb=db_first_store
  Método: PUT
   {
          "id_produtos": "1, 2, 3",
          "finalizado": 1
    }
  */
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

  /*
  URL: http://localhost:13700/carrinho/1?nomedb=db_first_store
  Método: DELETE
  */
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
