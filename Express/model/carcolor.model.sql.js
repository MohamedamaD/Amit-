const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize.config");

const CarColor = sequelize.define("Color", {
  x: DataTypes.STRING,
});

module.exports = CarColor;
