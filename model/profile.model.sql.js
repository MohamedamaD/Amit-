const sequelize = require("../db/sequelize.config");
const { DataTypes } = require("sequelize");

const Profile = sequelize.define("Profile", {
  bio: { type: DataTypes.STRING, allowNull: true },
});

module.exports = Profile;
