const request = require('supertest');
const app = require('../app');
const config = require('../config/config.json');
const strings = require('../api/helpers/strings');
const testHelpers = require('../api/helpers/test_helpers');

// Criação das variáveis e preparação do ambiente de teste.
// O bodyProduto será usado para criar um produto, e depois usar o mesmo no fluxo de testes.
// O método resetarProdutoTeste() serve para garantir que o produto teste que será criado
// não seja duplicado e seja excluído após a finalização dos testes.

beforeAll(async () => {
  await testHelpers.resetarProdutoTeste();
});

let idProduto;
let url;
let data;

const bodyProduto = {
  nome_produto: strings.nomeTeste,
  descricao_produto: strings.nomeTeste,
  quantidade: 1,
  preco: 1,
  rating: 1,
  caminho_imagem: strings.nomeTeste,
};

test(strings.mensagemTesteCreateUsuarios1, async () => {
  url = `/produtos?nomedb=${config.dev.database}`;

  data = await request(app).post(url).send(bodyProduto).expect(200);
  idProduto = JSON.parse(data.text).id;
  console.log(`id_produto: ${idProduto}`);
});

test(strings.mensagemTesteGetProdutos1, async () => {
  url = `/produtos/${idProduto}?nomedb=${config.dev.database}`;
  data = await request(app).get(url).expect(200);
});

test(strings.mensagemTesteGetProdutos2, async () => {
  url = `/produtos?nomedb=${config.dev.database}`;
  data = await request(app).get(url).expect(200);
});

test(strings.mensagemTesteGetProdutos3, async () => {
  url = `/produtos?nomedb=${config.dev.database}&nome_produto=${strings.nomeTeste}`;
  data = await request(app).get(url).expect(200);
});

test(strings.mensagemTestePutProdutos1, async () => {
  let bodyEdicaoProduto = {
    nome_produto: strings.nomeTesteEditado,
  };
  url = `/produtos/${idProduto}?nomedb=${config.dev.database}`;
  data = await request(app).put(url).send(bodyEdicaoProduto).expect(200);
});

test(strings.mensagemTesteDeleteProdutos1, async () => {
  url = `/produtos/${idProduto}?nomedb=${config.dev.database}`;
  data = await request(app).delete(url).expect(200);
});

test(strings.mensagemTesteDeleteProdutos2, async () => {
  url = `/produtos/${idProduto}?nomedb=${config.dev.database}`;
  data = await request(app).delete(url).expect(200);
});

afterAll(async () => {
  await testHelpers.resetarProdutoTeste();
});
