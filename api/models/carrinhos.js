const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, nomeTable = 'carrinhos') => {
  class Carrinhos extends Model {}

  Carrinhos.init(
    {
      id_produtos: DataTypes.STRING,
      id_usuario: DataTypes.INTEGER,
      finalizado: DataTypes.BOOLEAN,
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

  if (nomeTable === 'view_carrinhos') {
    Carrinhos.init(
      {
        id_produtos: DataTypes.STRING,
        id_usuario: DataTypes.INTEGER,
        nome: DataTypes.STRING,
        finalizado: DataTypes.BOOLEAN,
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
  return Carrinhos;
};
