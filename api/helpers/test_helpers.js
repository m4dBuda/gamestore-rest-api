const { Sequelize } = require('sequelize');
const helpers = require('../helpers/helpers');
const strings = require('../helpers/strings');
const Usuarios = require('../models/usuarios');
const Produtos = require('../models/produtos');
const TipoProdutos = require('../models/tipo_produtos');
const config = require('../../config/config.json');

async function resetarUsuarioTeste() {
  const sequelize = helpers.getSequelize(config.teste.database);
  const usuario = await Usuarios(sequelize, Sequelize.DataTypes).findOne({
    where: {
      cpf: strings.cpfTeste,
    },
  });
  if (usuario) {
    await Usuarios(sequelize, Sequelize.DataTypes).destroy({
      where: {
        id: usuario.id,
      },
    });
  }
  return;
}

async function resetarProdutoTeste() {
  const sequelize = helpers.getSequelize(config.teste.database);
  const produto = await Produtos(sequelize, Sequelize.DataTypes).findOne({
    where: {
      descricao_produto: strings.nomeTeste,
    },
  });
  if (produto) {
    await Produtos(sequelize, Sequelize.DataTypes).destroy({
      where: {
        id: produto.id,
      },
    });
  }
  return;
}

async function resetarTipoProdutoTeste() {
  const sequelize = helpers.getSequelize(config.teste.database);
  const tipoProduto = await TipoProdutos(sequelize, Sequelize.DataTypes).findOne({
    where: {
      descricao: strings.nomeTeste,
    },
  });
  if (tipoProduto) {
    await TipoProdutos(sequelize, Sequelize.DataTypes).destroy({
      where: {
        id: tipoProduto.id,
      },
    });
  }
  return;
}

module.exports = {
  resetarUsuarioTeste,
  resetarProdutoTeste,
  resetarTipoProdutoTeste,
};
