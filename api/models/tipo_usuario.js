const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, nomeTable = 'tipo_usuario') => {
  class TipoUsuario extends Model {}

  TipoUsuario.init(
    {
      id: DataTypes.INTEGER,
      tipo_conta: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: nomeTable,
      timestamps: false,
    },
  );

  return TipoUsuario;
};
