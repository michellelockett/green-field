const Sequelize = require('sequelize');
const { db } = require('../db/index');

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  userName: {
    type: Sequelize.STRING,
    unique: true
  },
  hash: {
    type: Sequelize.STRING
  }
});

module.exports = User;
