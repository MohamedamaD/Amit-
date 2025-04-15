const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize.config");

const Cars = sequelize.define("Car", {
  brand: { type: DataTypes.STRING, allowNull: false },
  model: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Cars;


