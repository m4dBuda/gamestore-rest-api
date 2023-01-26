const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes, nomeTable = 'carrinho') => {
  class Carrinho extends Model {}

  Carrinho.init(
    {
      id_produtos: DataTypes.STRING,
      id_usuario: DataTypes.INTEGER,
      finalizado: DataTypes.BOOLEAN,
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
    Carrinho.init(
      {
        id_produtos: DataTypes.STRING,
        id_usuario: DataTypes.INTEGER,
        nome: DataTypes.STRING,
        finalizado: DataTypes.BOOLEAN,
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
  return Carrinho;
};
