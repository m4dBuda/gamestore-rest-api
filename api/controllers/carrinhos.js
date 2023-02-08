const { Sequelize } = require('sequelize');
const Carrinhos = require('../models/carrinhos');
const helpers = require('../helpers/helpers');
const dbHelpers = require('../helpers/db_helpers');
const strings = require('../helpers/strings');

module.exports = {
  /*
  URL: http://localhost:13700/carrinhos?nomedb=db_first_store
  Método: POST
  
  {
    "id_usuario": 4,
    "id_produtos": "3, 3, 4, 6, 1"
  }
 */
  create: async (req, res) => {
    try {
      // Desestruturação de objeto da requisição.
      const { body, query } = req;

      // Obtendo a instância do banco de dados.
      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      // Validando se o usuário já possui um carrinho não finalizado, ou se
      // quer abandonar o carrinho antigo e criar um novo
      // Parametros: {forcar} - Se true abandona o carrinho anterior e cria um novo.
      const carrinhoFinalizado = await dbHelpers.isCarrinhoFinalizado(req, query.forcar);

      if (!carrinhoFinalizado) {
        return res.status(200).send({ mensagem: `Já existe um carrinho ativo para este usuário!` });
      }

      if (carrinhoFinalizado) {
        // Se não existir carrinho ativo ou se forcar == true, cria um novo carrinho
        // para o usuário.
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

  /*
  URL: http://localhost:13700/carrinhos?nomedb=db_first_store
  Método: GET
 */
  getAll: async (req, res) => {
    try {
      // Desestruturação de objeto da requisição.
      const { query } = req;

      // Obtendo a instância do banco de dados.
      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      // Buscando todos os carrinhos do bancos de dados.
      const carrinhos = await Carrinhos(sequelizeInstance, strings.VIEW_CARRINHOS).findAll();

      return res.status(200).send(carrinhos || { error: `Não há carrinhos para visualizar.` });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  /*
  URL: http://localhost:13700/carrinhos/1?nomedb=db_first_store
  Método: GET
 */
  getById: async (req, res) => {
    try {
      // Desestruturação de objeto da requisição.
      const { params, query } = req;

      // Obtendo a instância do banco de dados.
      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      // Buscando o carrinho do id recebido no bancos de dados.
      const carrinho = await Carrinhos(sequelizeInstance, strings.VIEW_CARRINHOS).findOne({
        where: {
          id_usuario: params.id,
          ativo: 1,
          finalizado: 0,
        },
      });

      // Busca os produtos dentro do carrinho pelo `id_produto
      // e adiciona ao objeto da response.
      await dbHelpers.getProdutosCarrinho(carrinho, req);

      return res.status(200).send(carrinho || { error: `Carrinho não encontrado` });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  /*
  URL: http://localhost:13700/carrinhos/1?nomedb=db_first_store
  Método: PUT
   {
          "id_produtos": "1, 2, 3",
          "finalizado": 1
    }
  */
  update: async (req, res) => {
    try {
      // Desestruturação de objeto da requisição.
      const { body, query, params } = req;

      // Obtendo a instância do banco de dados.
      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      // Alterando o carrinho do id recebido no bancos de dados.
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

  /*
  URL: http://localhost:13700/carrinhos/1?nomedb=db_first_store
  Método: DELETE
  */
  delete: async (req, res) => {
    try {
      // Desestruturação de objeto da requisição.
      const { params, query } = req;

      // Obtendo a instância do banco de dados.
      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      // Buscando o carrinho do id recebido no bancos de dados.
      const carrinho = await Carrinhos(sequelizeInstance).findOne({
        where: { id: params.id },
      });

      if (!carrinho) {
        return res.status(404).send({ mensagem: `Carrinho não encontrado!` });
      }

      if (carrinho) {
        // Função que faz a verificação de estado do objeto encontrado.
        // Se 1 então 0, Se 0 então 1.
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
