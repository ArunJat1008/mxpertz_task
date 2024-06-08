const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const StudentModel = require("../models/studentModel");
const CompanyModel = require("../models/companyModel");

const studentCompanyInterview = sequelize.define(
  "student_company_interview",
  {
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("PASS", "FAIL", "ON_HOLD", "DID_NOT_ATTEMPT"),
      allowNull: false,
      defaultValue: "DID_NOT_ATTEMPT",
    },
  },
  { timestamps: true }
);

StudentModel.hasMany(studentCompanyInterview, {
  foreignKey: "studentId",
  onDelete: "CASCADE",
});
studentCompanyInterview.belongsTo(StudentModel, {
  foreignKey: "studentId",
  onDelete: "CASCADE",
});

CompanyModel.hasMany(studentCompanyInterview, {
  foreignKey: "companyId",
  onDelete: "CASCADE",
});

studentCompanyInterview.belongsTo(CompanyModel, {
  foreignKey: "companyId",
  onDelete: "CASCADE",
});

module.exports = studentCompanyInterview;
   