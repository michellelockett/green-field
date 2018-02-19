const Sequelize = require('sequelize');
const {db} = require("../db/index");
const {Classification} = require('./classification')

const Book = db.define('book', {
  title: {
    type: Sequelize.STRING
  },
  author: {
  	type: Sequelize.STRING
  },
  dewey: {
  	type: Sequelize.STRING
  },
  ISBN: {
  	type: Sequelize.INTEGER
  },
  format: {
  	type: Sequelize.STRING
  },
  bookCover: {
  	type: Sequelize.STRING
  },
  published: {
  	type: Sequelize.INTEGER
  }

});

Book.belongsTo(Classification)

Book.sync()
.then(() => {
  return Book.create({
    title: "A cool book"
  });
})
.catch((err) => {
  console.log('This error!', err);
});

exports.Book = Book;