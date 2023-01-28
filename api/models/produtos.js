const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, nomeTable = 'produtos') => {
  class Produtos extends Model {}

  Produtos.init(
    {
      nome_produto: DataTypes.STRING,
      descricao_produto: DataTypes.STRING,
      id_tipo_produto: DataTypes.INTEGER,
      preco: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      ativo: DataTypes.BOOLEAN,
      quantidade: DataTypes.INTEGER,
      caminho_imagem: DataTypes.STRING,
      criado_em: DataTypes.DATE,
      alterado_em: DataTypes.DATE,
      id_usuario: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: nomeTable,
      timestamps: false,
    },
  );
  if (nomeTable === 'view_produtos') {
    Produtos.init(
      {
        nome_produto: DataTypes.STRING,
        descricao_produto: DataTypes.STRING,
        id_tipo_produto: DataTypes.INTEGER,
        descricao_tipo_produto: DataTypes.STRING,
        preco: DataTypes.STRING,
        rating: DataTypes.INTEGER,
        ativo: DataTypes.BOOLEAN,
        quantidade: DataTypes.INTEGER,
        caminho_imagem: DataTypes.STRING,
        criado_em: DataTypes.DATE,
        alterado_em: DataTypes.DATE,
        id_usuario: DataTypes.INTEGER,
        nome_usuario: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: nomeTable,
        timestamps: false,
      },
    );
  }

  return Produtos;
};
