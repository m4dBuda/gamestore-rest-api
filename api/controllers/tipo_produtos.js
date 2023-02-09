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

  create: async (req, res) => {
    try {
      // Desestruturação de objeto da requisição.
      const { query, body } = req;

      // Abrindo conexão com banco de dados
      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      // Criando produto.
      const tipoProdutos = await TipoProdutos(sequelizeInstance).create({
        descricao: body.descricao,
      });

      return res.status(200).send({
        mensagem: `Tipo produto ${tipoProdutos.descricao} cadastrado com sucesso`,
        id: tipoProdutos.id,
      });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  /*
  URL: http://localhost:13700/tipo_produtos?nomedb=db_first_store
  Método: GET
  */
  getAll: async (req, res) => {
    try {
      // Desestruturação de objeto da requisição.
      const { query } = req;

      // Abrindo conexão com banco de dados.
      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      // Buscando produtos
      const tipoProduto = await TipoProdutos(sequelizeInstance).findAll();

      // Adicionando o usuário que criou o produto no objeto de cada produto.
      if (query.relacionar_usuario == true) {
        await dbHelpers.getUsuarioByCriadoPorLista(tipoProduto, req);
      }

      return res
        .status(200)
        .send(tipoProduto || { error: `Tipo produto não encontrado ou não existe.` });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  /*
  URL: http://localhost:13700/tipo_produtos/1?nomedb=db_first_store
  Método: GET
  */
  getById: async (req, res) => {
    try {
      // Desestruturação de objeto da requisição.
      const { params, query } = req;

      // Abrindo conexaõ com banco de dados.
      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      // Buscando por Tipo Produto.
      const tipoProduto = await TipoProdutos(sequelizeInstance).findOne({
        where: {
          id: params.id,
        },
      });

      return res
        .status(200)
        .send(tipoProduto || { error: `Tipo produto não encontrado ou não existe.` });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  /*
  URL: http://localhost:13700/tipo_produtos/1?nomedb=db_first_store
  Método: PUT
  */
  update: async (req, res) => {
    try {
      // Desestruturação de objeto da requisição.
      const { query, params, body } = req;

      // Abrindo conexaõ com banco de dados.
      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      // Atualizando produto.
      await TipoProdutos(sequelizeInstance).update(
        {
          descricao: body.descricao,
          alterado_por_id_usuario: body.alterado_por_id_usuario,
          alterado_em: new Date(),
        },
        {
          where: {
            id: params.id,
          },
        },
      );

      return res.status(200).send(
        { mensagem: `Tipo Produto atualizado com sucesso` } || {
          mensagem: 'Tipo Produto não encontrado',
        },
      );
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  /*
  URL: http://localhost:13700/tipo_produtos/1?nomedb=db_first_store
  Método: DELETE
  */
  delete: async (req, res) => {
    try {
      // Desestruturação de objeto da requisição.
      const { query, params } = req;

      // Abrindo conexaõ com o banco de dados.
      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      // Buscando pelo Tipo Produto a ativar/inativar.
      const tipoProduto = await TipoProdutos(sequelizeInstance).findOne({
        where: { id: params.id },
      });

      if (!tipoProduto) {
        return res.status(400).send({ error: 'Tipo produto não encontrado.' });
      }

      if (tipoProduto) {
        var novoEstadoTipoProduto = dbHelpers.updateEstado(tipoProduto);
      }

      await TipoProdutos(sequelizeInstance).update(
        {
          ativo: novoEstadoTipoProduto.estado,
          alterado_em: new Date(),
        },
        { where: { id: tipoProduto.id } },
      );

      return res
        .status(200)
        .send({ mensagem: `Tipo produto ${novoEstadoTipoProduto.novoEstado} com sucesso!` });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
};
