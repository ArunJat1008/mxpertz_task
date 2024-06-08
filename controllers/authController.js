const AuthModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Validator = require("node-input-validator");

exports.signup = async (req, res) => {
  const validator = new Validator.Validator(req.body, {
    username: "required|string",
    password: "required|string",
  });

  const matched = await validator.check();

  if (!matched) {
    return res.status(422).json({ success: false, message: validator.errors });
  }

  const { username, password } = req.body;

  try {
    let data = await AuthModel.findOne({ where: { username } });

    if (data) {
      return res
        .status(400)
        .json({ success: false, message: "Existing user name" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    data = await AuthModel.create({ username, password: hashedPassword });

    return res
      .status(201)
      .json({ success: true, message: "Created successfully", data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  const validator = new Validator.Validator(req.body, {
    username: "required|string",
    password: "required|string",
  });

  const matched = await validator.check();

  if (!matched) {
    return res.status(422).json({ success: false, message: validator.errors });
  }

  const { username, password } = req.body;
  try {
    const user = await AuthModel.findOne({ where: { username } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const hasValidPassword = await bcrypt.compare(
      password,
      user.dataValues.passsword
    );

    if (!hasValidPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ use: user.dataValues.id }, process.env.JWT_SECRET);

    delete user.dataValues.passsword;
    return res
      .status(200)
      .json({
        success: true,
        message: "Login successfully",
        data: { ...user, token },
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
