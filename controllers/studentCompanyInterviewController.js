const StudentCompanyInterviewModel = require("../models/studentCompanyInterviewModel.js");
const Validator = require("node-input-validator");

exports.scheduleInterview = async (req, res, next) => {
  const validator = new Validator.Validator(req.body, {
    studentId: "required|integer",
    companyId: "required|integer",
    date: "required",
  });

  const matched = await validator.check();

  if (!matched) {
    return res.status(422).json({ success: false, message: validator.errors });
  }

  const { studentId, companyId, date } = req.body;

  try {
    const data = await StudentCompanyInterviewModel.create({
      studentId,
      companyId,
      date,
    });

    return res
      .status(201)
      .json({ success: true, message: "Scheduled success", data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateInterviewStatus = async (req, res, next) => {
  const validator = new Validator.Validator(req.body, {
    interviewId: "required|integer",
    status: "required|string",
  });

  const matched = await validator.check();

  if (!matched) {
    return res.status(422).json({ success: false, message: validator.errors });
  }

  const interviewId = req.body.interviewId;
  const status = req.body.status;

  try {
    const data = await StudentCompanyInterviewModel.update(
      { status },
      { where: { id: interviewId } }
    );

    return res
      .status(201)
      .json({ success: true, message: "Update success", data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
