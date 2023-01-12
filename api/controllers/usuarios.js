const { Sequelize } = require('sequelize');
const Usuarios = require('../models/usuarios');
const bcrypt = require('bcrypt');

// Função para verificar se o número de matrícula já está cadastrado.
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
// Função para validar HASH de senhas.
async function compararSenhasLogin(req, usuarioLogin) {
  const boolean = await bcrypt.compare(req.body.senha, usuarioLogin.senha);
  return boolean;
}

module.exports = {
  async getAll(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const usuarios = await Usuarios(Sequelize, Sequelize.DataTypes).findAll();

      res.status(200).send(usuarios || { mensagem: `Usuário não encontrado` });
    } catch (error) {
      res.status(500).send({ error });
    } finally {
      sequelize.close();
    }
  },

  async create(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const checkCpf = await verificarCpfRepetido(req);
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
  async update(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const usuario = await Usuarios(sequelize, Sequelize.DataTypes).update(
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
    } catch (error) {
      res.status(500).send({ error });
    } finally {
      sequelize.close();
    }
  },
  async login(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const usuarioLogin = await Usuarios(sequelize, Sequelize.DataTypes).findOne({
        where: {
          email: req.body.email,
          ativo: 1,
        },
      });
      if (usuarioLogin) {
        const compararSenhas = await compararSenhasLogin(req, usuarioLogin);
        if (compararSenhas == true) {
          res.status(200).send({
            mensagem: `Login para ${usuarioLogin.email} realizado com sucesso!`,
          });
        }
        if (compararSenhas == false) {
          res.status(401).send({ error: `Senha incorreta.` });
        }
      }
      if (!usuarioLogin) {
        res.status(400).send({ error: `Não há nenhuma conta cadastrada com email informado` });
      }
    } catch (error) {
      res.status(500).send(error);
    } finally {
      sequelize.close();
    }
  },
};
