const request = require('supertest');
const app = require('../app');
const config = require('../config/config.json');
const strings = require('../api/helpers/strings');
const testHelpers = require('../api/helpers/test_helpers');

let url;
let data;
let idTipoProduto;
beforeAll(async () => {
  await testHelpers.resetarTipoProdutoTeste();
});

let bodyTipoProduto = {
  descricao: strings.nomeTeste,
};

test('Passo 1. Deve criar um novo tipo de produto', async () => {
  url = `/tipo_produtos?nomedb=${config.dev.database}`;

  data = await request(app).post(url).send(bodyTipoProduto).expect(200);
  idTipoProduto = JSON.parse(data.text).id;
  console.log(`id_tipo_produto: ${idTipoProduto}`);
});

test('Passo 2. Deve buscar o tipo de produto criado no passo 1', async () => {
  url = `/tipo_produtos/${idTipoProduto}?nomedb=${config.dev.database}`;
  data = await request(app).get(url).expect(200);
});

test('Passo 3. Deve buscar todos os tipos de produtos', async () => {
  url = `/tipo_produtos?nomedb=${config.dev.database}`;
  data = await request(app).get(url).expect(200);
});

test('Passo 4. Deve atualizar o tipo de produto criado no passo 1', async () => {
  let bodyEdicaoTipoProduto = {
    descricao: strings.nomeTesteEditado,
  };
  url = `/tipo_produtos/${idTipoProduto}?nomedb=${config.dev.database}`;
  data = await request(app).put(url).send(bodyEdicaoTipoProduto).expect(200);
});

test('Passo 5. Deve inativar o tipo de produto criado no passo 1', async () => {
  url = `/tipo_produtos/${idTipoProduto}?nomedb=${config.dev.database}`;
  data = await request(app).delete(url).expect(200);
});

test('Passo 6. Deve ativar o tipo de produto criado no passo 1.', async () => {
  url = `/tipo_produtos/${idTipoProduto}?nomedb=${config.dev.database}`;
  data = await request(app).delete(url).expect(200);
});

afterAll(async () => {
  await testHelpers.resetarTipoProdutoTeste();
});
