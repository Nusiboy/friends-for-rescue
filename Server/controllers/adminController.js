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
    const { userName, password} = req.body;
    const adminExists = await Admin.findOne({ userName });
      if (!adminExists) {
      return res.status(401).json("No user");
    }
    const passwordIsValid = bcrypt.compare(password, adminExists.password);
    if (!passwordIsValid) return res.status(401).json("password incorrect");
    const {
      userName: tokenUsername,
      _id,
    } = adminExists;
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
    const admin = await Admin.findOne({ _id });
    if (!admin) {
      return res.status(404).send("Admin not found.");
    }
    const mark = {
      longitude: longitude,
      latitude: latitude,
      markType: markType,
      found: found,
      information: information
    };
    admin.marks.push(mark);
    await admin.save();
    res.status(202).send("Mark has been added!");
  } catch (err) {
    res.status(500).json(err.message);
  }
};