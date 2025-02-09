// creating the user model for user
//

const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const userSequelize = require("./../config/db");

const User = userSequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
    },
  },
);

// Method for validate password
User.prototype.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method for change password
User.prototype.changePassword = async function (newPassword) {
  this.password = await bcrypt.hash(newPassword, 10);
  await this.save();
};

module.exports = User;
