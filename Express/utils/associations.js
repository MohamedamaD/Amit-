const User = require("../model/user.model.sql");
const Profile = require("../model/profile.model.sql");
const Cars = require("../model/cars.model.sql");
const Colors = require("../model/colors.models.sql");

const associations = () => {
  User.hasOne(Profile, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    as: "profile",
  });
  Profile.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    as: "user",
  });

  User.hasMany(Cars, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    as: "cars",
  });
  Cars.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    as: "user",
  });

  Cars.belongsToMany(Colors, { through: "CarColor" });
  Colors.belongsToMany(Cars, { through: "CarColor" });
};

module.exports = associations;
