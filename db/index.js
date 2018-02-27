// require Sequelize
const Sequelize = require('sequelize');

const db = new Sequelize('conan_dev','root', '', {
  host : "localhost",
  dialect: 'mysql'
});

exports.db = db;