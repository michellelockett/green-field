const Sequelize = require('sequelize');
const {db} = require("../db/index");
const {Classification} = require('./classification')

const Book = db.define('book', {
  title: {
    type: Sequelize.STRING
  },
  dewey: {
  	type: Sequelize.STRING
  },
  ISBN: {
  	type: Sequelize.INTEGER,
  },
  format: {
  	type: Sequelize.STRING
  },
  cover: {
  	type: Sequelize.STRING
  },
  published: {
  	type: Sequelize.INTEGER
  }
});


module.exports = Book;