// Require dependencies
const Sequelize = require('sequelize');
const CLEARDB = require('../config/cleardb.js');


const db = new Sequelize(CLEARDB.database, CLEARDB.uname, CLEARDB.pword, {
  host : CLEARDB.host,
  dialect: 'mysql',
  logging: false,
});

exports.db = db;