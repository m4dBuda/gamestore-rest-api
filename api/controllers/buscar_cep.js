const { Sequelize } = require('sequelize');
const helpers = require('../helpers/helpers');
const axios = require('axios');
const Usuarios = require('../models/usuarios');

module.exports = {
  buscarCep: async (req, res) => {
    try {
      const { params, query } = req;

      let url = `https://cdn.apicep.com/file/apicep/${params.cep}.json?`;

      if (query.id_usuario) {
        const sequelizeInstance = helpers.getSequelize();

        const usuario = await Usuarios(sequelizeInstance).findOne({
          where: {
            id: query.id_usuario,
          },
        });

        if (usuario) {
          url = `https://cdn.apicep.com/file/apicep/${usuario.cep}.json?`;
        }
      }

      const response = await axios.get(url);

      if (response.data.address === '' || response.data.address === null) {
        res.status(400).send({ error: 'O CEP informado é inválido. Tente outro CEP.' });
      }
      return res.status(200).send(response.data);
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  },
};
