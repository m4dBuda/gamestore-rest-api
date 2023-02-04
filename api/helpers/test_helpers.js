const { Sequelize } = require('sequelize');
const helpers = require('../helpers/helpers');
const strings = require('../helpers/strings');
const Usuarios = require('../models/usuarios');
const Produtos = require('../models/produtos');
const Carrinhos = require('../models/carrinhos');
const TipoProdutos = require('../models/tipo_produtos');
const config = require('../../config/config.json');

async function resetarUsuarioTeste() {
  const sequelize = helpers.getSequelize(config.teste.database);
  const usuario = await Usuarios(sequelize).findOne({
    where: {
      cpf: strings.cpfTeste,
    },
  });
  if (usuario) {
    await Usuarios(sequelize).destroy({
      where: {
        id: usuario.id,
      },
    });
  }
  return;
}
async function criarUsuarioTeste() {
  const sequelize = helpers.getSequelize(config.teste.database);

  const usuario = await Usuarios(sequelize).findOne({
    where: {
      cpf: strings.cpfTeste,
    },
  });

  if (usuario) {
    await Usuarios(sequelize).destroy({
      where: {
        id: usuario.id,
      },
    });
  }

  const usuarioTeste = await Usuarios(sequelize).create({
    nome: strings.nomeTeste,
    cpf: strings.cpfTeste,
    senha: strings.senhaTeste,
    email: strings.emailTeste,
    data_nascimento: strings.dataNascimentoTeste,
    id_tipo_usuario: strings.idTipoADMIN,
    telefone: strings.telefoneTeste,
    endereco: strings.enderecoTeste,
    endereco2: strings.teste,
  });

  const idUsuario = usuarioTeste.id;
  return idUsuario;
}

async function resetarProdutoTeste() {
  const sequelize = helpers.getSequelize(config.teste.database);
  const produto = await Produtos(sequelize).findOne({
    where: {
      descricao_produto: strings.nomeTesteDescricaoProduto,
    },
  });
  if (produto) {
    await Produtos(sequelize).destroy({
      where: {
        id: produto.id,
      },
    });
  }
  return;
}

async function resetarTipoProdutoTeste() {
  const sequelize = helpers.getSequelize(config.teste.database);
  const tipoProduto = await TipoProdutos(sequelize).findOne({
    where: {
      descricao: strings.nomeTeste,
    },
  });
  if (tipoProduto) {
    await TipoProdutos(sequelize).destroy({
      where: {
        id: tipoProduto.id,
      },
    });
  }
  return;
}

async function resetarCarrinhoTeste(idCarrinho) {
  const sequelize = helpers.getSequelize(config.teste.database);

  const carrinho = await Carrinhos(sequelize).findOne({
    where: {
      id: idCarrinho,
    },
  });

  if (carrinho) {
    await Carrinhos(sequelize).destroy({
      where: {
        id: carrinho.id,
      },
    });
  }
  return;
}

async function criarProdutoTeste() {
  const sequelize = helpers.getSequelize(config.teste.database);

  const produtoTeste = await Produtos(sequelize).findOne({
    where: {
      nome_produto: strings.nomeTesteProduto,
    },
  });
  if (produtoTeste) {
    await Produtos(sequelize).findOne({
      where: {
        id: produtoTeste.id,
      },
    });
  }
  const novoProdutoTeste = await Produtos(sequelize).create({
    nome_produto: strings.nomeTesteProduto,
    descricao_produto: strings.nomeTesteDescricaoProduto,
    quantidade: 1,
    preco: 1,
    rating: 1,
    caminho_imagem: strings.nomeTeste,
  });

  return novoProdutoTeste.id;
}

module.exports = {
  criarUsuarioTeste,

  criarProdutoTeste,

  resetarUsuarioTeste,
  resetarProdutoTeste,
  resetarTipoProdutoTeste,
  resetarCarrinhoTeste,
};
