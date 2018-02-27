const Sequelize = require('Sequelize');
const {db} = require('../db/index');
const {Book} = require('./book');
const {User} = require('./user');

const BookUsers = db.define('bookUsers', {
	id: {
	  type: Sequelize.INTEGER,
	  primaryKey: true,
	  autoincrement: true
	},
	bookId: {
	  type: Sequelize.INTEGER
	},
	userId: {
		type: Sequelize.INTEGER
	}
});

BookUsers.sync()
.catch(err => {
	console.log(`An error was encountered while syncing the database: `, err);
});

Book.belongsToMany(User, {through: BookUsers});
User.belongsToMany(Book, {through: BookUsers});

exports.BookUsers = BookUsers;
