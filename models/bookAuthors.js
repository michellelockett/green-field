const Sequelize = require('sequelize');
const {db} = require("../db/index");
const {Book} = require("./book");
const {Author} = require("./author");

const BookAuthors = db.define('bookAuthors', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
  // bookId: {
  //   type: Sequelize.INTEGER
  // },
  // authorId: {
  //   type: Sequelize.INTEGER
  // }
});


BookAuthors.sync()
.catch((err) => {
  console.log('This error!', err);
});

Book.belongsToMany(Author, { through: BookAuthors});
Author.belongsToMany(Book, { through: BookAuthors});


exports.BookAuthors = BookAuthors;


