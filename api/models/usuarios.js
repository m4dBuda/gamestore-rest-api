const { Model, DataTypes } = require('sequelize');
const strings = require('../helpers/strings');

module.exports = (sequelize, nomeTable = 'usuarios') => {
  class Usuarios extends Model {}

  Usuarios.init(
    {
      nome: DataTypes.STRING,
      cpf: DataTypes.STRING,
      senha: DataTypes.STRING,
      email: DataTypes.STRING,
      data_nascimento: DataTypes.STRING,
      telefone: DataTypes.STRING,
      endereco: DataTypes.STRING,
      endereco2: DataTypes.STRING,
      cep: DataTypes.STRING,
      id_tipo_usuario: DataTypes.INTEGER,
      ativo: DataTypes.BOOLEAN,
      usuario_logado: DataTypes.BOOLEAN,
      criado_em: DataTypes.DATE,
      alterado_em: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: nomeTable,
      timestamps: false,
    },
  );

  if (nomeTable === strings.VIEW_USUARIOS) {
    Usuarios.init(
      {
        nome: DataTypes.STRING,
        cpf: DataTypes.STRING,
        senha: DataTypes.STRING,
        email: DataTypes.STRING,
        data_nascimento: DataTypes.STRING,
        telefone: DataTypes.STRING,
        endereco: DataTypes.STRING,
        endereco2: DataTypes.STRING,
        cep: DataTypes.STRING,
        id_tipo_usuario: DataTypes.INTEGER,
        tipo_conta: DataTypes.STRING,
        ativo: DataTypes.BOOLEAN,
        criado_em: DataTypes.DATE,
        alterado_em: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: nomeTable,
        timestamps: false,
      },
    );
  }

  return Usuarios;
};
