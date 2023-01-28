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
        id: item.id_usuario,
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

async function getProdutosCarrinho(carrinho, req) {
  const sequelize = helpers.getSequelize(req.query.nomedb);
  const dados_produto = [];

  for (let idProduto of carrinho.id_produtos) {
    const produto = await Produtos(sequelize, Sequelize.DataTypes, 'view_produtos').findOne({
      where: {
        id: idProduto,
      },
    });
    if (produto) {
      dados_produto.push(produto);
    }
  }
  carrinho.dataValues.dados_produto = dados_produto;
  return carrinho;
}

function updateEstado(item) {
  let estado;
  let novoEstado;

  if (item.ativo == 0) {
    estado = 1;
    novoEstado = 'ativado';
  }

  if (item.ativo == 1) {
    estado = 0;
    novoEstado = 'inativado';
  }

  return { estado, novoEstado };
}

module.exports = {
  getUsuarioByCriadoPorLista,
  getProdutosCarrinho,

  isCarrinhoFinalizado,

  updateEstado,
};
