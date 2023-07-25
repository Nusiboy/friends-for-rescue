const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.admins = (req, res) => {
  Admin.find({}).then((data) => {
    res.send(data);
  });
};
exports.register = async (req, res) => {
  try {
    const { userName, email, password, phone } = req.body;
    const adminExists = await Admin.findOne({ userName, email, phone });
    if (adminExists) {
      return res.status(401).send("Admin already exists");
    }
    const newAdmin = await Admin.create({ userName, email, password, phone });
    res.status(200).send("Created successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
exports.login = async (req, res) => {
  try {
    const { userName, email, password, phone } = req.body;
    const adminExists = await Admin.findOne({ userName, email, phone });
    if (!adminExists) {
      return res.status(401).json("No Admin");
    }
    console.log(password, adminExists.password);
    const passwordIsValid = bcrypt.compare(password, adminExists.password);
    if (!passwordIsValid) return res.status(401).json("password incorrect");
    const {
      userName: tokenUsername,
      _id,
      email: tokenEmail,
      phone: tokenPhone,
    } = adminExists;
    const token = jwt.sign(
      { userName: tokenUsername, _id, email: tokenEmail, phone: tokenPhone },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.json({ token }).status(200);
  } catch (err) {
    res.status(500).send(err.messege);
  }
};
