const Sequelize = require('sequelize');
const db = require('../db');

const Event = db.define('event', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  },
  start_date: {
    type: Sequelize.STRING,
    allowNull: false
  },
  end_date: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = Event;
