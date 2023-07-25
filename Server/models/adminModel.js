const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  userName: { type: String, unique: true, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => /.@./.test(v),
      message: "Email must contain @",
    },
  },
  phone: { type: Number, unique: true, required: true },
  password: { type: String, required: true },
  marks: [
    {
      longitude: { type: Number, unique: true },
      latitude: { type: Number, unique: true },
      markType: {
        type: String,
        enum: [
          "Police Station",
          "Beit Chabad",
          "Hospital",
          "Israeli Embassy",
          "Camping Site",
          "Hiking Trail",
        ],
      },
      description: { type: String },
      default: [],
    },
  ],
  polygon: [
{
  
  default: [],
}
  ],
});
module.exports = mongoose.model("Admin", adminSchema);
