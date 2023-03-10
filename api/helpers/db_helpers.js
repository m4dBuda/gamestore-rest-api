const { Sequelize } = require('sequelize');
const helpers = require('./helpers');
const strings = require('./strings');
const Carrinhos = require('../models/carrinhos');
const Produtos = require('../models/produtos');

async function isCarrinhoFinalizado(req, forcar) {
  const { query, body } = req;

  const sequelize = helpers.getSequelize(query.nomedb);

  const carrinho = await Carrinhos(sequelize).findOne({
    where: {
      id_usuario: body.id_usuario,
      finalizado: 0,
    },
  });

  if (!carrinho) {
    return true;
  }

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

async function getProdutosCarrinho(carrinho, req) {
  const sequelize = helpers.getSequelize(req.query.nomedb);

  const dados_produtos = [];
  let valorTotal = 0;
  for (let idProduto of carrinho.id_produtos) {
    const id = parseInt(idProduto);

    if (isNaN(id)) {
      continue;
    }

    const produto = await Produtos(sequelize, strings.VIEW_PRODUTOS).findOne({
      where: {
        id: id,
      },
    });

    if (produto) {
      dados_produtos.push(produto);
    }

    const preco = parseFloat(produto.preco.replace('R$', '').replace(',', '.'));

    valorTotal += preco;
  }

  carrinho.dataValues.valor_total = valorTotal;

  if (req.query.qnt_parcelas) {
    await getCalculoParcelas(carrinho, req.query.qnt_parcelas);
  }
  carrinho.dataValues.dados_produtos = dados_produtos;

  return carrinho;
}

async function getCalculoParcelas(carrinho, qntParcelas) {
  let jurosMensais = 0;

  if (qntParcelas > 0 && qntParcelas <= 6) {
    jurosMensais = 0.07;
  }
  if (qntParcelas > 6 && qntParcelas <= 12) {
    jurosMensais = 0.1;
  }
  if (qntParcelas > 12 && qntParcelas <= 24) {
    jurosMensais = 0.14;
  }

  const porcentagemJuros = jurosMensais * 100;
  const valorParcela =
    (carrinho.dataValues.valor_total * jurosMensais) /
    (1 - Math.pow(1 + jurosMensais, -qntParcelas));

  const valorFinal = valorParcela * qntParcelas;

  carrinho.dataValues.valor_total = parseFloat(valorFinal).toFixed(2);
  carrinho.dataValues.qnt_parcelas = qntParcelas;
  carrinho.dataValues.porcentagem_juros = parseFloat(porcentagemJuros).toFixed(2);
  carrinho.dataValues.valor_parcelas = parseFloat(valorParcela).toFixed(2);

  return carrinho;
}

function updateEstado(item, res) {
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
  getProdutosCarrinho,

  isCarrinhoFinalizado,

  updateEstado,
};
