// require Sequelize
const Sequelize = require('sequelize');

const db = new Sequelize('conan_dev','root', '', {
  host : "localhost",
  dialect: 'mysql',
 
  // consider adding pool
});

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

exports.db = db;