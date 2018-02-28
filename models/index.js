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

let testBook1 = null;
let testBook2 = null;
let testUser1 = null;
let testUser2 = null;
let testUser3 = null;

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
  testBook1 = book;

  return Book.create({
    "isbn": 9780671704278,
    "title": "Technical Manual",
    "published": 1991,
    "description": "The Star Trek: The Next Generation® Technical Manual, written by Rick Sternbach and Michael Okuda, the technical advisors to Star Trek: The Next Generation, provides a comprehensive schematization of a Galaxy-class starship. From the bridge to the shuttlebays, from the transporter room to crews' quarters, this book provides a never-before-seen glimpse at the inner, intricate workings of the most incredible starship ever conceived. Full of diagrams, technical schematics, and ship's plans, the Star Trek: The Next Generation Technical Manual also takes a detailed look at the principles behind Star Trek®'s awesome technology -- from phasers to warp drive to the incredible holodeck.",
    "pages": 192,
    "format": "BOOK",
        authors: [
      { firstName: "Steven", lastName: "King"},
      { firstName: "Chris", lastName: "Poole"},
    ],
    "cover": "http://books.google.com/books/content?id=po7406HGXQYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
  });
})
.then((book) => {
  testBook2 = book;
  return User.create({
    firstName: 'Jeremiah',
    lastName: 'Cerda',
    userName: 'jdog',
    hash: 'insecurepassword'
  });
})
.then((user) => {
  testUser1 = user;
  return User.create({
    firstName: 'Michelle',
    lastName: 'Lockett',
    userName: 'mdog',
    hash: 'insecurepassword'
  });
})
.then((user) => {
  testUser2 = user;
  return User.create({
    firstName: 'Chris',
    lastName: 'Poole',
    userName: 'cdog',
    hash: 'insecurepassword'
  });
})
.then((user) => {
  testUser3 = user;
})
.then(() => {
  testUser1.addBook(testBook1);
  testUser1.addBook(testBook2);
  testUser2.addBook(testBook1);
  testUser3.addBook(testBook2);
})
.catch(err => {
  console.log(err);
});


exports.Author = Author;
exports.Book = Book;
exports.User = User;
exports.BookUser = BookUser;
exports.BookAuthor = BookAuthor;
