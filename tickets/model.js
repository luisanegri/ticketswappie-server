const Sequelize = require('sequelize');
const db = require('../db');
const User = require('../user/model');
const Event = require('../events/model');

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
  }
});

Ticket.belongsTo(User);
User.hasMany(Ticket);
//rsTicket.belongsTo(Event);

module.exports = Ticket;
