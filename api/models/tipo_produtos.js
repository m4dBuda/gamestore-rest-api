const { Model, DataTypes } = require('sequelize');
const Usuarios = require('../models/usuarios');

module.exports = (sequelize, nomeTable = 'tipo_produtos') => {
  class TipoProdutos extends Model {}

  TipoProdutos.init(
    {
      descricao: DataTypes.STRING,
      ativo: DataTypes.BOOLEAN,
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

  TipoProdutos.belongsTo(Usuarios(sequelize), { foreignKey: 'id_usuario' });

  return TipoProdutos;
};
