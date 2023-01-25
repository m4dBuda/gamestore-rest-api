const { Sequelize } = require('sequelize');
const helpers = require('./helpers');
const Usuarios = require('../models/usuarios');
const Carrinho = require('../models/carrinho');
const Produtos = require('../models/produtos');

async function getUsuarioByCriadoPorLista(lista, req) {
  const sequelize = helpers.getSequelize(req.query.nomedb);

  for (const item of lista) {
    const usuario = await Usuarios(sequelize, Sequelize.DataTypes).findOne({
      where: {
        id: item.criado_por_id_usuario,
      },
    });

    item.dataValues.dados_usuario = usuario;
  }
  return lista;
}

async function isCarrinhoFinalizado(req, forcar) {
  const sequelize = helpers.getSequelize(req.query.nomedb);

  const carrinho = await Carrinho(sequelize, Sequelize.DataTypes).findOne({
    where: {
      id_usuario: req.body.id_usuario,
      finalizado: 0,
    },
  });

  if (carrinho) {
    if (forcar == true) {
      await Carrinho(sequelize, Sequelize.DataTypes).update(
        {
          finalizado: 1,
          alterado_em: new Date(),
        },
        {
          where: {
            id_usuario: req.body.id_usuario,
          },
        },
      );
      return true;
    }
    if (carrinho && !forcar) {
      return false;
    }
  } else {
    return true;
  }
}

async function getUsuarioByIdObjeto(objeto, req) {
  const sequelize = helpers.getSequelize(req.query.nomedb);

  const usuario = await Usuarios(sequelize, Sequelize.DataTypes).findOne({
    where: {
      id: objeto.id_usuario,
    },
  });

  objeto.dataValues.dados_usuario = usuario;

  return objeto;
}

async function getProdutosCarrinho(carrinho, req) {
  const sequelize = helpers.getSequelize(req.query.nomedb);

  for (let idProduto of carrinho.id_produtos) {
    const produto = await Produtos(sequelize, Sequelize.DataTypes).findOne({
      where: {
        id: idProduto,
      },
    });
    carrinho.dataValues.dados_produto = produto;
  }
  return carrinho;
}

module.exports = {
  getUsuarioByCriadoPorLista,
  getUsuarioByIdObjeto,
  getProdutosCarrinho,

  isCarrinhoFinalizado,
};
