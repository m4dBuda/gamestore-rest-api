const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes, nomeTable = 'produtos') => {
  class Produtos extends Model {}

  Produtos.init(
    {
      nome: DataTypes.STRING,
      preco: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      ativo: DataTypes.BOOLEAN,
      imagem: DataTypes.STRING,
      descricao: DataTypes.STRING,
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
  return Produtos;
};
