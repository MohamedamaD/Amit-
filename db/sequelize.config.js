const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize({
  database: process.env.SQL_DATABASE,
  username: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  host: process.env.SQL_HOST,
  port: process.env.SQL_PORT,
  dialect: process.env.SQL_DIALECT,
  logging:false
});

module.exports = sequelize;
