const request = require('supertest');
const app = require('../app');
const config = require('../config/config.json');
const strings = require('../api/helpers/strings');
const testHelpers = require('../api/helpers/test_helpers');

// Criação das variáveis e preparação do ambiente de teste.
// O bodyUsuario será usado para criar um usuário, e depois testar os erros relacionados a criação
// O método resetarUsuarioTeste() serve para garantir que o usuário teste que será criado
// não exista.

let url;
let data;
let idUsuario;
let bodyUsuario;
let bodyUsuarioEditado;

beforeAll(async () => {
  await testHelpers.resetarUsuarioTeste();

  bodyUsuario = {
    nome: strings.nomeTeste,
    cpf: strings.cpfTeste,
    senha: strings.senhaTeste,
    email: strings.emailTeste,
    data_nascimento: strings.dataNascimentoTeste,
    id_tipo_usuario: strings.idTipoADMIN,
    telefone: strings.telefoneTeste,
    endereco: strings.enderecoTeste,
  };

  bodyUsuarioEditado = {
    nome: strings.nomeTesteEditado,
  };
});

test(strings.mensagemTesteCreateUsuarios1, async () => {
  url = `/usuarios?nomedb=${config.teste.database}`;
  data = await request(app).post(url).send(bodyUsuario).expect(200);
  idUsuario = JSON.parse(data.text).id;
});

test(strings.mensagemTesteCreateUsuarios2, async () => {
  url = `/usuarios?nomedb=${config.teste.database}`;
  data = await request(app).post(url).send(bodyUsuario).expect(401);
});

test(strings.mensagemTesteCreateUsuarios3, async () => {
  bodyUsuario.email = 'test2@example.com';
  url = `/usuarios?nomedb=${config.teste.database}`;
  data = await request(app).post(url).send(bodyUsuario).expect(401);
});

test(strings.mensagemTesteGetUsuarios1, async () => {
  url = `/usuarios?nomedb=${config.teste.database}`;
  data = await request(app).get(url).expect(200);
});

test(strings.mensagemTesteGetUsuarios2, async () => {
  url = `/usuarios/${idUsuario}?nomedb=${config.teste.database}`;
  data = await request(app).get(url).expect(200);
});

test(strings.mensagemTestePutUsuarios1, async () => {
  url = `/usuarios/${idUsuario}?nomedb=${config.teste.database}`;
  data = await request(app).put(url).send(bodyUsuarioEditado).expect(200);
});

test(strings.mensagemTesteDeleteUsuarios1, async () => {
  url = `/usuarios/${idUsuario}?nomedb=${config.dev.database}`;
  data = await request(app).delete(url).expect(200);
});

test(strings.mensagemTesteDeleteUsuarios2, async () => {
  url = `/usuarios/${idUsuario}?nomedb=${config.dev.database}`;
  data = await request(app).delete(url).expect(200);
});

afterAll(async () => {
  await testHelpers.resetarUsuarioTeste();
});
