const Sequelize = require('sequelize');
const Author = require('./author');
const User = require('./user');
const Book = require('./book');
const { db } = require('../db/index');

// Define join tables
const BookUser = db.define('bookUser', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

const BookAuthor = db.define('bookAuthor', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

// Declare associations
Book.belongsToMany(User, { through: BookUser });
User.belongsToMany(Book, { through: BookUser });

Book.belongsToMany(Author, { through: BookAuthor });
Author.belongsToMany(Book, { through: BookAuthor });

// Sync entire database (must be performed after associations created)
db.sync({ force: true })
.then(() => {
  return Book.create({
    "isbn": 9780143124870,
    "title": "A Tale for the Time Being",
    "published": 2013,
    "description": "A novelist on a remote island in the Pacific is linked to a bullied and depressed Tokyo teenager after discovering a Hello Kitty lunchbox that washed ashore.",
    "pages": 422,
    "format": "BOOK",
    "cover": "http://books.google.com/books/content?id=4XfuMQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
  });
})
.then((book) => {
  return User.create({
    firstName: 'Jeremiah',
    lastName: 'Cerda',
    userName: 'jdog',
    hash: 'insecurepassword'
  });

}).then(() => {

  return User.create({
    firstName: 'Michelle',
    lastName: 'Lockett',
    userName: 'mdog',
    hash: 'insecurepassword'
  });

}).then(() => {

  return User.create({
    firstName: 'Chris',
    lastName: 'Poole',
    userName: 'cdog',
    hash: 'insecurepassword'
  });
})
.catch(err => {
  console.log(err);
});

exports.Author = Author;
exports.Book = Book;
exports.User = User;
exports.BookUser = BookUser;
exports.BookAuthor = BookAuthor;
