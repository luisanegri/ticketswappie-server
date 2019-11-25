const Sequelize = require('sequelize');
const db = require('../db');

const Event = db.define('event', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  image: Sequelize.STRING,
  start_date: Sequelize.STRING,
  end_date: Sequelize.STRING
});

module.exports = Event;
