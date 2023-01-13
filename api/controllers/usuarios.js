const { Sequelize } = require('sequelize');
const Usuarios = require('../models/usuarios');
const bcrypt = require('bcrypt');
const helpers = require('../helpers/helpers');

// Função para verificar se o CPF já está cadastrado.
async function verificarCpfRepetido(req) {
  const sequelize = helpers.getSequelize(req.query.nomedb);
  const isCPFCadastrado = await Usuarios(sequelize, Sequelize.DataTypes).findOne({
    where: {
      cpf: req.body.cpf,
    },
  });
  if (isCPFCadastrado) {
    return true;
  } else {
    return false;
  }
}

// Função para verificar se o email já está cadastrado.
async function verificarEmailRepetido(req) {
  const sequelize = helpers.getSequelize(req.query.nomedb);
  const isEmailCadastrado = await Usuarios(sequelize, Sequelize.DataTypes).findOne({
    where: {
      email: req.body.email,
    },
  });
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
  async getAll(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const usuarios = await Usuarios(sequelize, Sequelize.DataTypes).findAll();

      res.status(200).send(usuarios || { mensagem: `Usuário não encontrado` });
    } catch (error) {
      res.status(500).send({ error });
    } finally {
      sequelize.close();
    }
  },

  /*
  URL: http://localhost:13700/usuarios/2?nomedb=db_first_store
  Método: GET
  
 */
  async getById(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const usuario = await Usuarios(sequelize, Sequelize.DataTypes).findOne({
        where: {
          id: req.params.id,
        },
      });

      res.status(200).send(usuario || { mensagem: `Usuário não encontrado` });
    } catch (error) {
      res.status(500).send({ error });
    } finally {
      sequelize.close();
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
  async create(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const checkCpf = await verificarCpfRepetido(req);
      const checkEmail = await verificarEmailRepetido(req);
      if (checkEmail == true) {
        return res
          .status(401)
          .send({ error: `Este email já está cadastrado e vinculado a uma conta.` });
      }
      if (checkCpf == true) {
        return res
          .status(401)
          .send({ error: `Este cpf já está cadastrado e vinculado a uma conta.` });
      } else {
        const hash = await bcrypt.hash(req.body.senha, 12);

        const usuario = await Usuarios(sequelize, Sequelize.DataTypes).create({
          nome: req.body.nome,
          cpf: req.body.cpf,
          senha: hash,
          email: req.body.email,
          data_nascimento: req.body.data_nascimento,
          telefone: req.body.telefone,
          endereco: req.body.endereco,
          endereco2: req.body.endereco2,
        });
        res.status(200).send({ mensagem: `Usuário registrado com sucesso`, usuario });
      }
    } catch (error) {
      res.status(500).send({ error });
    } finally {
      sequelize.close();
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
  async update(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      await Usuarios(sequelize, Sequelize.DataTypes).update(
        {
          nome: req.body.nome,
          email: req.body.email,
          data_nascimento: req.body.data_nascimento,
          telefone: req.body.telefone,
          endereco: req.body.endereco,
          endereco2: req.body.endereco2,
          alterado_em: new Date(),
        },
        {
          where: { id: req.params.id },
        },
      );

      res.status(200).send({ mensagem: `Usuário editado com sucesso!` });
    } catch (error) {
      res.status(500).send({ error });
    } finally {
      sequelize.close();
    }
  },

  /*
  URL: http://localhost:13700/usuarios/2?nomedb=db_first_store
  Método: DELETE
  
 */
  async delete(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const usuario = await Usuarios(sequelize, Sequelize.DataTypes).findOne({
        where: { id: req.params.id },
      });
      if (usuario) {
        let estado;
        let novoEstado;
        if (usuario.ativo == 0) {
          estado = 1;
          novoEstado = 'ativado';
        }
        if (usuario.ativo == 1) {
          estado = 0;
          novoEstado = 'inativado';
        }

        await Usuarios(sequelize, Sequelize.DataTypes).update(
          {
            ativo: estado,
            alterado_em: new Date(),
          },
          {
            where: {
              id: req.params.id,
            },
          },
        );
        res.status(200).send({ mensagem: `Usuário ${novoEstado} com sucesso!` });
      } else {
        res.status(400).send({ error: `Usuário não encontrado` });
      }
    } catch (error) {
      res.status(500).send({ error });
    } finally {
      sequelize.close();
    }
  },
};
