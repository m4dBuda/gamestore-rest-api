const { Sequelize } = require('sequelize');
const Usuarios = require('../models/usuarios');
const bcrypt = require('bcrypt');
const helpers = require('../helpers/helpers');
const dbHelpers = require('../helpers/db_helpers');
const strings = require('../helpers/strings');

// Função para verificar se o CPF já está cadastrado.
async function verificarCpfRepetido(req) {
  // Abrindo conexão com o banco de dados.
  const sequelize = helpers.getSequelize(req.query.nomedb);

  // Buscando algum usuário no banco de dados que contenha o CPF recebido.
  const isCPFCadastrado = await Usuarios(sequelize).findOne({
    where: {
      cpf: req.body.cpf,
    },
  });
  // Se o CPF já pertencer a algum cadastro, true, se não, false.
  if (isCPFCadastrado) {
    return true;
  } else {
    return false;
  }
}

// Função para verificar se o email já está cadastrado.
async function verificarEmailRepetido(req) {
  // Abrindo conexão com o banco de dados.
  const sequelize = helpers.getSequelize(req.query.nomedb);

  // Buscando algum usuário no banco de dados que contenha o email recebido.
  const isEmailCadastrado = await Usuarios(sequelize).findOne({
    where: {
      email: req.body.email,
    },
  });
  // Se o Email já pertencer a algum cadastro, true, se não, false.
  if (isEmailCadastrado) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  /*
  URL: http://localhost:13700/usuarios?nomedb=db_first_store
  Método: GET
  
  */
  getAll: async (req, res) => {
    try {
      // Desestruturação de objeto da requisição.
      const { query } = req;

      // Abrindo conexão com o banco de dados.
      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      // Buscando usuários no banco de dados.
      const usuarios = await Usuarios(sequelizeInstance, strings.VIEW_USUARIOS).findAll();

      return res.status(200).send(usuarios || { mensagem: `Usuário ${strings.naoEncontrado}` });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  /*
  URL: http://localhost:13700/usuarios/2?nomedb=db_first_store
  Método: GET
  
  */
  getById: async (req, res) => {
    try {
      // Desestruturação de objeto da requisição.
      const { query, params } = req;

      // Abrindo conexão com o banco de dados.
      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      // Buscando usuário no banco de dados com o `id` recebido nos parametros.
      const usuario = await Usuarios(sequelizeInstance, strings.VIEW_USUARIOS).findOne({
        where: {
          id: params.id,
        },
      });

      return res.status(200).send(usuario || { mensagem: `Usuário ${strings.naoEncontrado}` });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  /*
  URL: http://localhost:13700/usuarios?nomedb=db_first_store
  Método: POST
  
  Body esperado para criar uma conta de usuário:
  {
    
    "nome": "Teste",
    "cpf": "111.222.333.44",
    "senha": "123456",
    "email": "teste@email.com",
    "data_nascimento": "05/12/1990",
    "telefone": "(62)9-9580-7060",
    "endereco": "Rua teste, nº 1, Qd. 1, Lt. 1",
    "endereco2": "Casa azul, portão marrom"
  
  }
  
 */
  create: async (req, res) => {
    try {
      // Desestruturação de objeto da requisição.
      const { body, query } = req;

      // Abrindo conexão com o banco de dados.
      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      // Validando se o CPF já está cadastrado no banco de dados.
      const checkCpf = await verificarCpfRepetido(req);
      if (checkCpf) {
        return res
          .status(401)
          .send({ error: `Este cpf já está cadastrado e vinculado a uma conta.` });
      }

      // Validando se o Email já está cadastrado no banco de dados.
      const checkEmail = await verificarEmailRepetido(req);
      if (checkEmail) {
        return res
          .status(401)
          .send({ error: `Este email já está cadastrado e vinculado a uma conta.` });
      }

      // Criptografando a senha do usuário para armazenar no banco de dados.
      const hash = await bcrypt.hash(body.senha, 12);

      // Criando o usuário no banco de dados.
      const usuario = await Usuarios(sequelizeInstance).create({
        nome: body.nome,
        cpf: body.cpf,
        senha: hash,
        email: body.email,
        data_nascimento: body.data_nascimento,
        id_tipo_usuario: body.id_tipo_usuario,
        telefone: body.telefone,
        endereco: body.endereco,
        endereco2: body.endereco2,
        cep: body.cep,
      });

      return res
        .status(200)
        .send({ mensagem: `Usuário ${strings.criadoComSucesso}`, id: usuario.id });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  /*
  URL: http://localhost:13700/usuarios/2?nomedb=db_first_store
  Método: PUT
  
  Body esperado para criar uma conta de usuário:
  {
    
    "nome": "Teste",
    "email": "teste@email.com",
    "data_nascimento": "05/12/1990",
    "telefone": "(62)9-9580-7060",
    "endereco": "Rua teste, nº 1, Qd. 1, Lt. 1",
    "endereco2": "Casa azul, portão marrom"
  
  }
  
 */
  update: async (req, res) => {
    try {
      // Desestruturação de objeto da requisição.
      const { params, body, query } = req;

      // Abrindo conexão com o banco de dados.
      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      // Atualizando o usuário do `id` recebido dos parametros, com o body recebido.
      await Usuarios(sequelizeInstance).update(
        {
          nome: body.nome,
          email: body.email,
          data_nascimento: body.data_nascimento,
          id_tipo_usuario: body.id_tipo_usuario,
          telefone: body.telefone,
          endereco: body.endereco,
          endereco2: body.endereco2,
          cep: body.cep,
          alterado_em: new Date(),
        },
        {
          where: { id: params.id },
        },
      );

      return res.status(200).send({ mensagem: `Usuário ${strings.editadoComSucesso}` });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },

  /*
  URL: http://localhost:13700/usuarios/2?nomedb=db_first_store
  Método: DELETE
  
 */

  delete: async (req, res) => {
    try {
      // Desestruturação de objeto da requisição.
      const { query, params } = req;

      // Abrindo conexão com o banco de dados.
      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      // Buscando usuário a ser ativado/inativado no banco de dados.
      const usuario = await Usuarios(sequelizeInstance).findOne({
        where: { id: params.id },
      });

      if (!usuario) {
        return res.status(404).send({ error: 'Usuário não encontrado' });
      }

      // Função para gerenciar estado do usuário encontrado.
      // Se o estado anterior for igual 1, agora será 0, e vice versa.
      const novoEstadoUsuario = dbHelpers.updateEstado(usuario);

      // Atualizando estado do usuário encontrado anteriormente.
      await Usuarios(sequelizeInstance).update(
        {
          ativo: novoEstadoUsuario.estado,
          alterado_em: new Date(),
        },
        {
          where: {
            id: usuario.id,
          },
        },
      );
      return res
        .status(200)
        .send({ mensagem: `Usuário ${novoEstadoUsuario.novoEstado} com sucesso!` });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
};
