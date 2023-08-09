const mongoose = require("mongoose");

const shapeSchema = new mongoose.Schema({
    type: {
    type: String,
  },
  latitude:{
    type: String,
    },
  center:{
    type: Object,
    },
  longitude: {
    type: String,
  },
  radius: {
    type: String,
  },
  coordinates: [{
    type: Object,
}],
  northEast: {
    type: Object, 
  },
  southWest: {
    type: Object, 
  },
});
module.exports = mongoose.model("shape", shapeSchema);