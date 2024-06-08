const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Auth = sequelize.define('auth', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Auth;
