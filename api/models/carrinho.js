const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes, nomeTable = 'carrinho') => {
  class Carrinho extends Model {}

  Carrinho.init(
    {
      id_produtos: DataTypes.STRING,
      finalizado: DataTypes.BOOLEAN,
      id_usuario: DataTypes.INTEGER,
      criado_em: DataTypes.DATE,
      alterado_em: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: nomeTable,
      timestamps: false,
    },
  );
  return Carrinho;
};
