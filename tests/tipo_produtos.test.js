const request = require('supertest');
const app = require('../app');
const config = require('../config/config.json');
const strings = require('../api/helpers/strings');
const testHelpers = require('../api/helpers/test_helpers');

let url;
let data;
let idTipoProduto;
let bodyTipoProduto;
let idUsuario;
let bodyDeleteProduto;
let bodyEdicaoTipoProduto;

beforeAll(async () => {
  await testHelpers.resetarTipoProdutoTeste();

  idUsuario = await testHelpers.criarUsuarioTeste();

  bodyTipoProduto = {
    descricao: strings.nomeTeste,
  };

  bodyDeleteProduto = {
    id_usuario: idUsuario,
  };

  bodyEdicaoTipoProduto = {
    descricao: strings.nomeTesteEditado,
  };
});

test('Passo 1. Deve criar um novo tipo de produto', async () => {
  url = `/tipo_produtos?nomedb=${config.teste.database}`;
  data = await request(app).post(url).send(bodyTipoProduto).expect(200);
  idTipoProduto = JSON.parse(data.text).id;
});

test('Passo 2. Deve buscar o tipo de produto criado no passo 1', async () => {
  url = `/tipo_produtos/${idTipoProduto}?nomedb=${config.teste.database}`;
  data = await request(app).get(url).expect(200);
});

test('Passo 3. Deve buscar todos os tipos de produtos', async () => {
  url = `/tipo_produtos?nomedb=${config.teste.database}`;
  data = await request(app).get(url).expect(200);
});

test('Passo 4. Deve atualizar o tipo de produto criado no passo 1', async () => {
  url = `/tipo_produtos/${idTipoProduto}?nomedb=${config.teste.database}`;
  data = await request(app).put(url).send(bodyEdicaoTipoProduto).expect(200);
});

test('Passo 5. Deve inativar o tipo de produto criado no passo 1', async () => {
  url = `/tipo_produtos/${idTipoProduto}?nomedb=${config.teste.database}`;
  data = await request(app).delete(url).send(bodyDeleteProduto).expect(200);
});

test('Passo 6. Deve ativar o tipo de produto criado no passo 1.', async () => {
  url = `/tipo_produtos/${idTipoProduto}?nomedb=${config.teste.database}`;
  data = await request(app).delete(url).send(bodyDeleteProduto).expect(200);
});

afterAll(async () => {
  await testHelpers.resetarTipoProdutoTeste();
  await testHelpers.resetarUsuarioTeste();
});
