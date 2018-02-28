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
db
  .sync({ force: true })
  .then(() => {
    return Book.create(
      {
        title: 'Test',
        users: [{ id: 2 }, { id: 3 }],
        authors: [
          {
            firstName: 'me',
            lastName: 'you'
          },

          {
            firstName: 'you',
            lastName: 'you'
          }
        ]
      },
      {
        include: [
          {
            model: Author,
            as: 'authors'
          },
          {
            model: User,
            as: 'users'
          }
        ]
      }
    );
  })
  .then(book => {})
  .catch(err => {
    console.log(err);
  });

exports.Author = Author;
exports.Book = Book;
exports.User = User;
exports.BookUser = BookUser;
exports.BookAuthor = BookAuthor;
