const Sequelize = require('sequelize');
const db = require('../db');
const User = require('../user/model');
const Ticket = require('../tickets/model');

const Comment = db.define('comment', {
  comment: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING
  }
});

Comment.belongsTo(User);
// Comment.belongsTo(Ticket, { foreignKey: commentId });

module.exports = Comment;
