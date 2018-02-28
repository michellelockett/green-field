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
  cover: {
  	type: Sequelize.STRING
  },
  published: {
  	type: Sequelize.INTEGER
  }

});

// Book.belongsTo(Classification)

Book.sync({force: true})
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
.then(() => {
  return Book.create({
    "isbn": 9780671704278,
    "title": "Technical Manual",
    "published": 1991,
    "description": "The Star Trek: The Next Generation® Technical Manual, written by Rick Sternbach and Michael Okuda, the technical advisors to Star Trek: The Next Generation, provides a comprehensive schematization of a Galaxy-class starship. From the bridge to the shuttlebays, from the transporter room to crews' quarters, this book provides a never-before-seen glimpse at the inner, intricate workings of the most incredible starship ever conceived. Full of diagrams, technical schematics, and ship's plans, the Star Trek: The Next Generation Technical Manual also takes a detailed look at the principles behind Star Trek®'s awesome technology -- from phasers to warp drive to the incredible holodeck.",
    "pages": 192,
    "format": "BOOK",
    "cover": "http://books.google.com/books/content?id=po7406HGXQYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
  });
})
.catch((err) => {
  console.log('This error!', err);
});

exports.Book = Book;