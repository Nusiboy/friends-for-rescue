const mongoose = require("mongoose");


const markSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  latitude:{
    type: String,
    },
  longitude: {
    type: String,
  },
  found: {
    type: String,
  },
  information: { 
    type: String, 
  },
  markType: {
    type: String, 
  },
  date: { 
    type: Date, 
  },
});
module.exports = mongoose.model("Mark", markSchema);