const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Student = sequelize.define(
  "student",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    collegeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("PLACED", "NOTPLACED"),
      allowNull: false,
    },
    dsaScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    webdScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reactScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = Student;
