const Sequelize = require('sequelize');
const db = require('../db');
const User = require('../user/model');
const Ticket = require('../tickets/model');

const Comment = db.define('comment', {
  comment: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Comment.belongsTo(User);
Comment.belongsTo(Ticket);

module.exports = Comment;