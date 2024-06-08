const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const company = sequelize.define("company", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = company;
