const { Sequelize } = require('sequelize');
const Usuarios = require('../models/usuarios');
const bcrypt = require('bcrypt');
const helpers = require('../helpers/helpers');

// Função para validar HASH de senhas.
async function compararSenhasLogin(req, usuarioLogin) {
  const boolean = await bcrypt.compare(req.body.senha, usuarioLogin.senha);
  return boolean;
}

// Função para validar nova_senha com senha_atual na alteração de senhas
// Se as senhas forem iguais, não permitirá a edição.
async function validarSenhaNova(usuario, senha_nova) {
  const boolean = await bcrypt.compare(senha_nova, usuario.senha);
  return boolean;
}

/*
  URL: http://localhost:13700/login?nomedb=db_first_store
  Método: POST
  
  Body esperado para fazer login:
  {
    
    "email":"teste@email.com",
    "senha":"1234"
  
  }

 */
module.exports = {
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

  /*

  URL: http://localhost:13700/login/2?nomedb=db_first_store
  Método: PUT

  Body esperado para alterar senha:
  {

    "senha":"123456",
    "senha_nova":"654321"

  }
 */
  async alterarSenha(req, res) {
    const sequelize = helpers.getSequelize(req.query.nomedb);
    try {
      const { senha, nova_senha } = req.body;
      const { id } = req.params;

      // Função para trocar a senha dentro da conta ( Usuário já está logado )
      const usuario = await Usuarios(sequelize, Sequelize.DataTypes).findOne({
        where: {
          id,
        },
      });

      // Comparando `senha` recebida do body com senha armazenada no banco.
      const compararSenhas = await compararSenhasLogin(req, usuario);
      if (compararSenhas) {
        const validarSenha = await validarSenhaNova(usuario, senha_nova);
        if (validarSenha == true) {
          res
            .status(400)
            .send({ mensagem: `Você não pode usar a mesma senha! Escolha uma nova senha.` });
        }

        // Criando hash com o valor recebido em `nova_senha` do body.
        const hashNovaSenha = await bcrypt.hash(nova_senha, 12);
        // Trocando a senha do usuário com o Hash da `nova_senha` recebida do body
        await Usuarios(sequelize, Sequelize.DataTypes).update(
          {
            senha: hashNovaSenha,
            alterado_em: new Date(),
          },
          {
            where: {
              id,
            },
          },
        );
        res.status(200).send({ mensagem: `Senha alterada com sucesso!` });
      } else {
        res.status(401).send({ error: `Senha atual incorreta!` });
      }
    } catch (error) {
      res.status(500).send({ error });
    } finally {
      sequelize.close();
    }
  },
};
