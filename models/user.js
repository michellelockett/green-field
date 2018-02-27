const Sequelize = require('sequelize');
const {db} = require("../db/index");

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  userName : {
    type: Sequelize.STRING,
    unique: true
  },
  hash: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
User.sync({force: true}).then(() => {

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

}).catch((err) => {

  console.log(`An error was encountered while seeding the database: `, err);

});

exports.User = User;