const Sequelize = require('Sequelize');
const { db } = require('../db/index');

const Classification = db.define('classfication', {
  catagory: {
    type: Sequelize.INTEGER
  }
});

Classification.sync().catch(err => {});

exports.Classification = Classification;
