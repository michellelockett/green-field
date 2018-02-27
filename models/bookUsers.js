const Sequelize = require('Sequelize');
const {db} = require('../db/index');
const {Book} = require('./book');
const {User} = require('./user');

const BookUser = db.define('bookUser', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

Book.belongsToMany(User, {through: BookUser});
User.belongsToMany(Book, {through: BookUser});

db.sync();

BookUser.sync({force: true}).then(() => {

	return User.findById(2);

}).then((user) => {

	Book.findById(1).then((book) => {
    book.addUser(user);
	});

  Book.findById(1).then((book) => {
    book.addUser(user);
  });

  Book.findById(1).then((book) => {
    book.addUser(user);
  });

})
.catch(err => {

	console.log(`An error was encountered while syncing the database: `, err);

});


exports.BookUser = BookUser;
