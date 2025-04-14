const sequelize = require("../db/sequelize.config");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

module.exports = User;