const Sequelize = require('sequelize');
const databaseUrl = 'postgres://postgres:6772@localhost:5432/postgres';
const db = new Sequelize(databaseUrl);

db.sync({ force: false })
  .then(() => console.log('database has been updated'))
  .catch(error => console.log(error));

module.exports = db;
