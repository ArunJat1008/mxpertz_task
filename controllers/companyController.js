const Validator = require("node-input-validator");
const CompanyModel = require("../models/companyModel");

exports.addcompany = async (req, res, next) => {
  const validator = new Validator.Validator(req.body, {
    company_name: "required|string",
    email: "required|email",
    phone: "required|string",
  });

  const matched = await validator.check();

  if (!matched) {
    return res.status(422).json({ success: false, message: validator.errors });
  }

  const companyName = req.body.company_name;
  const email = req.body.email;
  const phone = req.body.phone;

  try {
    let company = await CompanyModel.findOne({ company_name: companyName });

    if (company) {
      return res
        .status(400)
        .json({ success: false, message: "Company already registered" });
    }

    company = await CompanyModel.create({
      company_name: companyName,
      email: email,
      phone: phone,
    });

    return res.status(201).json({
      success: true,
      message: "Company added successfully",
      data: company,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getCompanies = async (req, res, next) => {
  try {
    const data = await CompanyModel.findAll();
    return res
      .status(200)
      .json({ success: true, message: "company list", data });
  } catch (error) {
    res.status(400).json({ success: false, messaage: error.message });
  }
};
