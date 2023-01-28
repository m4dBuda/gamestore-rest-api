const { Sequelize } = require('sequelize');
const Usuarios = require('../models/usuarios');
const bcrypt = require('bcrypt');
const helpers = require('../helpers/helpers');

// Função para comparar a senha recebida com senha do banco de dados.
async function compararSenhas(senha, usuario) {
  const boolean = await bcrypt.compare(senha, usuario.senha);
  return boolean;
}

module.exports = {
  /*
  URL: http://localhost:13700/login
  Método: POST
  
  Body:
  {
    "email":"teste@email.com",
    "senha":"123456"
  }
 */
  login: async (req, res) => {
    try {
      // Desestruturar objeto de requisição
      const { query, body } = req;

      // Obter instância do Sequelize
      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      // Validação do email
      const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(body.email)) {
        return res.status(400).send({ error: 'Formato de e-mail inválido' });
      }

      // Validação da senha
      if (body.senha.length < 6) {
        return res.status(400).send({ error: 'A senha deve ter pelo menos 6 caracteres' });
      }
      // Buscar usuário no banco de dados
      const usuarioLogin = await Usuarios(sequelizeInstance, Sequelize.DataTypes).findOne({
        where: {
          email: body.email,
          ativo: 1,
        },
      });

      // Verificar se usuário existe
      if (!usuarioLogin) {
        return res
          .status(400)
          .send({ error: 'Não há nenhuma conta cadastrada com o e-mail informado' });
      }

      // Comparar senhas
      const senhasConferem = await compararSenhas(body.senha, usuarioLogin);
      if (!senhasConferem) {
        return res.status(401).send({ error: 'Senha incorreta.' });
      }
      return res
        .status(200)
        .send({ message: `Login para ${usuarioLogin.email} realizado com sucesso!` });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  /*

  URL: http://localhost:13700/login/:id
  Método: PUT

  Body esperado para alterar senha:
  {
    "senha":"123456",
    "senha_nova":"654321"
  }
 */
  alterarSenha: async (req, res) => {
    try {
      // Desestruturar objeto de requisição
      const { query, body, params } = req;

      // Obter instância do Sequelize
      const sequelizeInstance = helpers.getSequelize(query.nomedb);

      // Validar comprimento mínimo da nova senha.
      if (body.nova_senha.length < 6) {
        return res.status(400).send({ error: 'A senha deve ter pelo menos 6 caracteres' });
      }

      // Buscar usuário no banco de dados
      const usuario = await Usuarios(sequelizeInstance, Sequelize.DataTypes).findOne({
        where: {
          id: params.id,
          ativo: 1,
        },
      });

      if (!usuario) {
        return res.status(400).send({ error: 'Usuário não encontrado ou inativo' });
      }

      // Comparando senhas e validando se a nova senha é igual a senha anterior.
      const validarSenhas = await compararSenhas(body.senha, usuario);

      if (!validarSenhas) {
        return res.status(401).send({ error: `Senha atual incorreta!` });
      }

      if (body.senha === body.nova_senha) {
        return res
          .status(400)
          .send({ mensagem: `Você não pode usar a mesma senha! Escolha uma nova senha.` });
      }

      // Criando hash com o valor recebido em `nova_senha` do body.
      const hashNovaSenha = await bcrypt.hash(body.nova_senha, 12);

      // Alterando a senha do usuário.
      await Usuarios(sequelizeInstance, Sequelize.DataTypes).update(
        {
          senha: hashNovaSenha,
          alterado_em: new Date(),
        },
        {
          where: {
            id: params.id,
          },
        },
      );
      return res.status(200).send({ message: `Senha alterada com sucesso!` });
    } catch (error) {
      return res.status(500).send({ error });
    }
  },
};
