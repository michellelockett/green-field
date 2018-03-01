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
  isbn: {
  	type: Sequelize.STRING,
  },
  format: {
  	type: Sequelize.STRING
  },
  cover: {
  	type: Sequelize.STRING
  },
  published: {
  	type: Sequelize.INTEGER
  },
  pages: {
    type: Sequelize.INTEGER
  }
});


module.exports = Book;