const { Sequelize } = require('sequelize');
const config = require('../../config/config');
const moment = require('moment');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const getSequelize = () => {
  return new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  });
};

module.exports = {
  getSequelize,
};
