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

Author.sync()
.catch((err) => {
  console.log('This error!', err);
});

exports.Author = Author;