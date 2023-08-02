const User = require("../models/userModel");
const Admin = require('../models/adminModel')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.users = async (req, res) => {
  console.log(req.body.id);
  const realid = jwt.verify(req.body.id,process.env.JWT_SECRET)
  User.findOne({_id:realid}).then((data) => {
    console.log(data);
    res.send(data);
  });
};
exports.register = async (req, res) => {
  try {
    const { userName, email, password, phone, info } = req.body;
    const userExists = await User.findOne({ userName });
    if (userExists) {
      return res.status(401).send("User already exists");
    }
    const newUser = await User.create({ userName, email, password, phone, info, marks: [] });
    res.status(200).send("Created successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { userName, password} = req.body;
    const userExists = await User.findOne({ userName });
    if (!userExists) {
      const adminExists = await Admin.findOne({ userName });
      if (!adminExists) {
      return res.status(401).json("No user");
    }}
    const passwordIsValid = bcrypt.compare(password, userExists.password);
    if (!passwordIsValid) return res.status(401).json("password incorrect");
    const {
      userName: tokenUsername,
      _id,
    } = userExists;
    const token = jwt.sign(
      { userName: tokenUsername, _id },
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

exports.markLocation = async (req, res) => {
  try {
    const { longitude, latitude, markType, found, information } = req.body;
    if (!longitude){
      return res.status(400).send("Please provide longitude.");
    }
    if (!latitude)
    return res.status(400).send("Please provide latitude.");
    if (!markType)
    return res.status(400).send("Please provide markType.");
    if (!found)
    return res.status(400).send("Please provide found.");
    if (!information)
    return res.status(400).send("Please provide information.");
    const { token } = req.body;
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(404).send("User not found.");
    }
    const mark = {
      longitude: longitude,
      latitude: latitude,
      markType: markType,
      found: found,
      information: information
    };
    user.marks.push(mark);
    await user.save();
    res.status(202).send("Mark has been added!");
  } catch (err) {
    res.status(500).json(err.message);
  }
};