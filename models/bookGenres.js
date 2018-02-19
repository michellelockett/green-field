const Sequelize = require('sequelize');
const {db} = require("../db/index");
const {Book} = require("./book");
const {Genre} = require("./genre");

const BookGenres = db.define('bookGenres', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoincrement: true
  }
  // bookId: {
  //     type: Sequelize.INTEGER
  // },
  // genreId: {
  //   type: Sequelize.INTEGER
  // }
});

BookGenres.sync()
.catch(err => {
  console.log('This error!', err);
});

Book.belongsToMany(Genre, { through: BookGenres});
Genre.belongsToMany(Book, { through: BookGenres});


exports.BookGenres = BookGenres;