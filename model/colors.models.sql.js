const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize.config");

const Colors = sequelize.define("Color", {
  name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Colors;
