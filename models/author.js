const Sequelize = require('sequelize');
const {db} = require("../db/index");

const Author = db.define('author', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});


module.exports = Author;