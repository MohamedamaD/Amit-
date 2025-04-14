const User = require("../model/user.model.sql");
const Profile = require("../model/profile.model.sql");

const associations = () => {
  User.hasOne(Profile,{ foreignKey: "userId", onDelete: "CASCADE",as : "profile" });
  Profile.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    as: "user",
  });
};

module.exports = associations;
