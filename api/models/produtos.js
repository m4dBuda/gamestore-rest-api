const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes, nomeTable = 'produtos') => {
  class Produtos extends Model {}

  Produtos.init(
    {
      nome_produto: DataTypes.STRING,
      descricao_produto: DataTypes.STRING,
      preco: DataTypes.STRING,
      quantidade: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      ativo: DataTypes.BOOLEAN,
      caminho_imagem: DataTypes.STRING,
      id_tipo_produto: DataTypes.INTEGER,
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
