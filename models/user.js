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
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});
exports.User = User;