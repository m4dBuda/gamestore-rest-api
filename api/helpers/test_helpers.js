const { Sequelize } = require('sequelize');
const helpers = require('../helpers/helpers');
const strings = require('../helpers/strings');
const Usuarios = require('../models/usuarios');
const config = require('../../config/config.json');

async function resetarUsuarioTeste() {
  const sequelize = helpers.getSequelize(config.teste.database);
  const usuario = await Usuarios(sequelize, Sequelize.DataTypes).findOne({
    where: {
      cpf: strings.cpfTeste,
    },
  });
  if (usuario) {
    await Usuarios(sequelize, Sequelize.DataTypes).destroy({
      where: {
        id: usuario.id,
      },
    });
  }
  return;
}

module.exports = {
  resetarUsuarioTeste,
};
