const request = require('supertest');
const app = require('../app');
const config = require('../config/config.json');
const strings = require('../api/helpers/strings');
const testHelpers = require('../api/helpers/test_helpers');

let bodyCarrinho;
let bodyCarrinhoEditado;
let idUsuario;
let idProduto;
let idCarrinho;
let url;
let data;

beforeAll(async () => {
  idUsuario = await testHelpers.criarUsuarioTeste();

  idProduto = await testHelpers.criarProdutoTeste();

  bodyCarrinho = {
    id_usuario: idUsuario,
    id_produtos: `${idProduto}, ${idProduto}, ${idProduto}`,
  };

  bodyCarrinhoEditado = {
    id_produtos: `${idProduto}, ${idProduto}, ${idProduto}`,
  };
});

test(strings.mensagemTesteCarrinho1, async () => {
  url = `/carrinhos?nomedb=${config.teste.database}`;
  data = await request(app).post(url).send(bodyCarrinho).expect(200);
  idCarrinho = JSON.parse(data.text).id;
  console.log(idCarrinho);
});

test(strings.mensagemTesteCarrinho2, async () => {
  url = `/carrinhos?nomedb=${config.teste.database}`;
  data = await request(app).get(url).expect(200);
});

test(strings.mensagemTesteCarrinho3, async () => {
  url = `/carrinhos/${idUsuario}?nomedb=${config.teste.database}`;
  data = await request(app).get(url).expect(200);
});

test(strings.mensagemTesteCarrinho4, async () => {
  url = `/carrinhos/${idCarrinho}?nomedb=${config.teste.database}`;
  data = await request(app).put(url).send(bodyCarrinhoEditado).expect(200);
});

test(strings.mensagemTesteCarrinho5, async () => {
  url = `/carrinhos/${idCarrinho}?nomedb=${config.teste.database}`;
  data = await request(app).delete(url).expect(200);
});

test(strings.mensagemTesteCarrinho6, async () => {
  url = `/carrinhos/${idCarrinho}?nomedb=${config.teste.database}`;
  data = await request(app).delete(url).expect(200);
});

afterAll(async () => {
  await testHelpers.resetarProdutoTeste();
  await testHelpers.resetarCarrinhoTeste(idCarrinho);
  await testHelpers.resetarUsuarioTeste();
});
