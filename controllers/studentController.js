const Validator = require("node-input-validator");
const StudentModel = require("../models/studentModel");

exports.getStudents = async (req, res, next) => {
  try {
    const students = await StudentModel.findAll();
    return res
      .status(200)
      .json({ success: true, message: "Students", data: students });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.addStudent = async (req, res, next) => {
  const validator = new Validator.Validator(req.body, {
    name: "required|string",
    collegeName: "required|string",
    status: "required|string",
    email: "required|email",
    dsaScore: "required|integer",
    webdScore: "required|integer",
    reactScore: "required|integer",
  });

  const matched = await validator.check();

  if (!matched) {
    return res.status(422).json({ success: false, message: validator.errors });
  }

  const { name, email, collegeName, status, dsaScore, webdScore, reactScore } =
    req.body;

  try {
    let data = await StudentModel.findOne({ where: { email } });

    if (data) {
      return res.status(400).json({ success: true, message: "Existing email" });
    }
    data = await StudentModel.create({
      name,
      collegeName,
      status,
      dsaScore,
      webdScore,
      reactScore,
    });

    return res
      .status(200)
      .json({ success: true, message: "Added successfully", data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
