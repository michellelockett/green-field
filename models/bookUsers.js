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

exports.BookUser = BookUser;
