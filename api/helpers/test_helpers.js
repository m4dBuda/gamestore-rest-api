const { Sequelize } = require('sequelize');
const helpers = require('../helpers/helpers');
const strings = require('../helpers/strings');
const Usuarios = require('../models/usuarios');
const Produtos = require('../models/produtos');
const Carrinhos = require('../models/carrinhos');
const TipoProdutos = require('../models/tipo_produtos');
const config = require('../../config/config.json');

async function resetarUsuarioTeste() {
  const sequelizeInstance = helpers.getSequelize(config.teste.database);

  const usuario = await Usuarios(sequelizeInstance).findOne({
    where: {
      cpf: strings.cpfTeste,
    },
  });
  if (usuario) {
    await Usuarios(sequelizeInstance).destroy({
      where: {
        id: usuario.id,
      },
    });
  }
  return;
}
async function criarUsuarioTeste() {
  const sequelizeInstance = helpers.getSequelize(config.teste.database);

  const usuario = await Usuarios(sequelizeInstance).findOne({
    where: {
      cpf: strings.cpfTeste,
    },
  });

  if (usuario) {
    await Usuarios(sequelizeInstance).destroy({
      where: {
        id: usuario.id,
      },
    });
  }

  const usuarioTeste = await Usuarios(sequelizeInstance).create({
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
  const sequelizeInstance = helpers.getSequelize(config.teste.database);

  const produto = await Produtos(sequelizeInstance).findOne({
    where: {
      descricao_produto: strings.nomeTesteDescricaoProduto,
    },
  });

  if (produto) {
    await Produtos(sequelizeInstance).destroy({
      where: {
        id: produto.id,
      },
    });
  }

  return;
}

async function resetarTipoProdutoTeste() {
  const sequelizeInstance = helpers.getSequelize(config.teste.database);

  const tipoProduto = await TipoProdutos(sequelizeInstance).findOne({
    where: {
      descricao: strings.nomeTeste,
    },
  });

  if (tipoProduto) {
    await TipoProdutos(sequelizeInstance).destroy({
      where: {
        id: tipoProduto.id,
      },
    });
  }

  return;
}

async function resetarCarrinhoTeste(idCarrinho) {
  const sequelizeInstance = helpers.getSequelize(config.teste.database);

  const carrinho = await Carrinhos(sequelizeInstance).findOne({
    where: {
      id: idCarrinho,
    },
  });

  if (carrinho) {
    await Carrinhos(sequelizeInstance).destroy({
      where: {
        id: carrinho.id,
      },
    });
  }

  return;
}

async function criarProdutoTeste() {
  const sequelizeInstance = helpers.getSequelize(config.teste.database);

  const produtoTeste = await Produtos(sequelizeInstance).findOne({
    where: {
      nome_produto: strings.nomeTesteProduto,
    },
  });
  if (produtoTeste) {
    await Produtos(sequelizeInstance).findOne({
      where: {
        id: produtoTeste.id,
      },
    });
  }
  const novoProdutoTeste = await Produtos(sequelizeInstance).create({
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
