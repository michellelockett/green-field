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
  	type: Sequelize.INTEGER,
    unique: true
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

Book.sync({force: true})
.then(() => {
  return Book.create({
    title: "Guide to React"
  });
})
.then(() => {
  return Book.create({
    title: "Guide to Angular"
  });
})
.then(() => {
  return Book.create({
    title: "Guide to Backbone"
  });
})
.then(() => {
  return Book.create({
    title: "Guide to jQuery"
  });
})
.catch((err) => {
  console.log('This error!', err);
});

exports.Book = Book;