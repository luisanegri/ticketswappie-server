const Sequelize = require('sequelize');
const db = require('../db');
const User = require('../user/model');
const Comment = require('../comment/model');

const Ticket = db.define('ticket', {
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  username: {
    type: Sequelize.STRING,
  },
});

Ticket.belongsTo(User);
User.hasMany(Ticket);
Ticket.hasMany(Comment);

module.exports = Ticket;
