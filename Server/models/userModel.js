const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: true 
  },
  type:{
    type: String,
    required: true,
    default: null,
    },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  info: {
    origin: {
      type: String,
      default: null,
    },
    mobility: {
      type: String,
      default: null,
    },
    medical: {
      type: String,
      default: null,
    },
  },
  marks: [
    {
      longitude: { type: Number },
      latitude: { type: Number },
      URL: { type: String },
      information: { type: String },
      default: [],
    },
  ],
});
module.exports = mongoose.model("User", userSchema);
