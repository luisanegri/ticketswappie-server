const Sequelize = require('sequelize');
const db = require('../db');
const User = require('../user/model');
const Event = require('../events/model');
const Comment = require('../comment/model');

const Ticket = db.define('ticket', {
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true
  },
  username: {
    type: Sequelize.STRING
  },
  userId: {
    type: Sequelize.INTEGER
  },
  eventId: {
    type: Sequelize.INTEGER
  },
  risk: {
    type: Sequelize.INTEGER
  }
});

Ticket.belongsTo(User);
User.hasMany(Ticket);
Ticket.hasMany(Comment);
//rsTicket.belongsTo(Event);

module.exports = Ticket;
