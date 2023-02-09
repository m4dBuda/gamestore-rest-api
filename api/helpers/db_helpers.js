const { Sequelize } = require('sequelize');
const helpers = require('./helpers');
const strings = require('./strings');
const Usuarios = require('../models/usuarios');
const Carrinhos = require('../models/carrinhos');
const Produtos = require('../models/produtos');

async function getUsuarioByCriadoPorLista(lista, req) {
  // Desestruturação de objeto da requisição.
  const { query } = req;

  // Abrindo conexão com o banco de dados.
  const sequelizeInstance = helpers.getSequelize(query.nomedb);

  // Loop para adicionar em cada objeto da lista recebida
  // os dados do usuário que o criou.
  for (const item of lista) {
    const usuario = await Usuarios(sequelizeInstance).findOne({
      where: {
        id: item.criado_por_id_usuario,
      },
    });

    item.dataValues.dados_usuario = usuario;
  }
  return lista;
}

// Função para ajudar na validação e criação de carrinhos.
//
//
// Caso um carrinho já exista e não tenha sido finalizado,
// retorna false.
//
// Caso um carrinho já exista não finalizado e a requisição
// Contenha `forcar = true` na query
// retorna true.
//
// Caso nenhum carrinho não finalizado não seja encontrado
// retorna true.

async function isCarrinhoFinalizado(req, forcar) {
  // Desestruturação de objeto da requisição.
  const { query, body } = req;

  // Abrindo conexão com o banco de dados;
  const sequelize = helpers.getSequelize(query.nomedb);

  // Buscando no banco de dados por um carrinho não finalizado do usuário recebido.
  const carrinho = await Carrinhos(sequelize).findOne({
    where: {
      id_usuario: body.id_usuario,
      finalizado: 0,
    },
  });

  if (!carrinho) {
    return true;
  }

  // Se o carrinho for encontrado e `forcar = true` na query da requisição
  // Inativa o último carrinho e força a criação de um novo.
  if (carrinho && forcar == true) {
    await Carrinhos(sequelize).update(
      {
        finalizado: 1,
        ativo: 0,
        alterado_em: new Date(),
      },
      {
        where: {
          id_usuario: body.id_usuario,
        },
      },
    );
    return true;
  }
  return false;
}

// Busca os produtos dentro de um carrinho pelo id,
// e adiciona o novo campo `dados_produtos` contendo
// os produtos encontrados para cada id_produto dentro de um carrinho.
async function getProdutosCarrinho(carrinho, req) {
  // Abrindo conexão com o banco de dados.
  const sequelize = helpers.getSequelize(req.query.nomedb);

  // Inicializando array de `dados_produtos` onde colocaremos
  // cada produto encontrado, e que será inserido no objeto `carrinho`.
  const dados_produtos = [];

  // Laço de repetição que retira da string `id_produtos` cada `id_produto`
  // e busca o mesmo no banco de dados para inserir no array `dados_produtos`
  for (let idProduto of carrinho.id_produtos) {
    const id = parseInt(idProduto);

    // Se o idProduto for um número, continua a função, caso não,
    // retorna e refaz o loop.
    if (isNaN(id)) {
      continue;
    }

    // Buscando o produto.
    const produto = await Produtos(sequelize, strings.VIEW_PRODUTOS).findOne({
      where: {
        id: id,
      },
    });

    // Se o produto for encontrado, é adicionado na lista/array `dados_produtos`
    if (produto) {
      dados_produtos.push(produto);
    }
  }
  // Cria o novo campo `dados_produtos` dentro do objeto `carrinho`,
  // e atribui a variável (array/lista) `dados_produtos`.
  carrinho.dataValues.dados_produtos = dados_produtos;
  return carrinho;
}

// Função para verificar e atualizar o estado de qualquer `objeto`
// encontrado no banco de dados que contenha o campo `ativo`.
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
