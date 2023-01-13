const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes, nomeTable = 'usuarios') => {
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
      id_tipo_usuario: DataTypes.INTEGER,
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

  return Usuarios;
};
