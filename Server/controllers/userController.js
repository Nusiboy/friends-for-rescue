const User = require("../models/userModel");
const Admin = require('../models/adminModel')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.users = (req, res) => {
  User.find({}).then((data) => {
    res.send(data);
  });
};
exports.register = async (req, res) => {
  try {
    const { userName, email, password, phone, info } = req.body;
    const userExists = await User.findOne({userName, email, phone });
    if (userExists) {
      return res.status(401).send("User already exists");
    }
    const newUser = await User.create({ userName, email, password, phone, info });
    res.status(200).send("Created successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
exports.login = async (req, res) => {
  try {
    const { userName, email, password, phone } = req.body;
    const userExists = await User.findOne({ userName, email, phone });
    if (!userExists) {
      const adminExists = await Admin.findOne({ userName, email, phone });
      if (!adminExists) {
      return res.status(401).json("No user");
    }}
    const passwordIsValid = bcrypt.compare(password, userExists.password);
    if (!passwordIsValid) return res.status(401).json("password incorrect");
    const {
      userName: tokenUsername,
      _id,
      email: tokenEmail,
      phone: tokenPhone,
    } = userExists;
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
exports.updateUser = async (req, res) => {
  try {
    const { origin, mobility, medical } = req.body;
    if (!origin && !mobility && !medical) {
      return res.status(400).send("Please provide either origin or mobility or medical for update.");
    }
    const {_id} = jwt.verify(req.body.token, process.env.JWT_SECRET)
    const user = await User.findOne({_id});
    if (!user) {
      return res.status(404).send("User not found.");
    }
    if (origin) {
      user.info.origin = origin
    }
    if (mobility) {
      user.info.mobility = mobility
    }
    if (medical) {
      user.info.medical = medical
    }
    await user.save();
    res.status(202).send("User has been updated");
  } catch (err) {
    res.status(500).json(err.message);
  }
};
