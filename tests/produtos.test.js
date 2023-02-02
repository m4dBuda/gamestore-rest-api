const request = require('supertest');
const app = require('../app');
const config = require('../config/config.json');
const strings = require('../api/helpers/strings');
const testHelpers = require('../api/helpers/test_helpers');

// Criação das variáveis e preparação do ambiente de teste.
// O bodyProduto será usado para criar um produto, e depois usar o mesmo no fluxo de testes.
// O método resetarProdutoTeste() serve para garantir que o produto teste que será criado
// não seja duplicado e seja excluído após a finalização dos testes.
let bodyProduto;
let bodyEdicaoProduto;
let bodyDeleteProduto;
let idUsuario;
let idProduto;
let url;
let data;

beforeAll(async () => {
  idUsuario = await testHelpers.criarUsuarioTeste();

  await testHelpers.resetarProdutoTeste();

  bodyProduto = {
    nome_produto: strings.nomeTesteProduto,
    descricao_produto: strings.nomeTesteDescricaoProduto,
    quantidade: 1,
    preco: 1,
    rating: 1,
    caminho_imagem: strings.nomeTeste,
  };

  bodyEdicaoProduto = {
    nome_produto: strings.nomeTesteEditado,
  };

  bodyDeleteProduto = {
    id_usuario: idUsuario,
  };
});

test(strings.mensagemTesteCreateUsuarios1, async () => {
  url = `/produtos?nomedb=${config.dev.database}`;
  data = await request(app).post(url).send(bodyProduto).expect(200);
  idProduto = JSON.parse(data.text).id;
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
  url = `/produtos/${idProduto}?nomedb=${config.dev.database}`;
  data = await request(app).put(url).send(bodyEdicaoProduto).expect(200);
});

test(strings.mensagemTesteDeleteProdutos1, async () => {
  url = `/produtos/${idProduto}?nomedb=${config.dev.database}`;
  data = await request(app).delete(url).send(bodyDeleteProduto).expect(200);
});

test(strings.mensagemTesteDeleteProdutos2, async () => {
  url = `/produtos/${idProduto}?nomedb=${config.dev.database}`;
  data = await request(app).delete(url).send(bodyDeleteProduto).expect(200);
});

afterAll(async () => {
  await testHelpers.resetarProdutoTeste();
  await testHelpers.resetarUsuarioTeste();
});
