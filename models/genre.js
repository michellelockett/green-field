const Sequelize = require('sequelize');
const { db } = require('../db/index');

const Genre = db.define('genre', {
  name: {
    type: Sequelize.STRING
  }
});

Genre.sync().catch(err => {});

exports.Genre = Genre;
