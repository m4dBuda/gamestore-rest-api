const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes, nomeTable = 'carrinho') => {
  class Carrinho extends Model {}

  Carrinho.init(
    {
      id_produtos: DataTypes.STRING,
      finalizado: DataTypes.BOOLEAN,
      criado_em: DataTypes.DATE,
      criado_por_id_usuario: DataTypes.INTEGER,
      alterado_em: DataTypes.DATE,
      alterado_por_id_usuario: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: nomeTable,
      timestamps: false,
    },
  );
  return Carrinho;
};
