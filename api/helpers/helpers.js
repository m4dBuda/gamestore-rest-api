const { Sequelize } = require('sequelize');
const env = 'dev';
const config = require('../../config/config.json')[env];
const moment = require('moment');

const getConfig = () => {
  config.dialectOptions = {
    decimalNumbers: true,
    dateStrings: true,
    typeCast(field, next) {
      if (field.type === 'DATETIME') {
        return field.string();
      }
      if (field.type === 'TIMESTAMP') {
        const date = field.string();
        return date === null ? '' : moment(date).format('DD/MM/YYYY HH:mm:ss');
      }
      return next();
    },
  };
  config.timezone = '-03:00';

  return config;
};

const getSequelize = (nomedb) => {
  return new Sequelize(nomedb, config.username, config.password, getConfig());
};

module.exports = {
  getSequelize,
};
