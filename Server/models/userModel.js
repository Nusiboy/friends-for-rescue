const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
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
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  info: {
    origin: {
      type: String,
      enum: ["Local", "Israeli", null],
      default: null,
    },
    mobility: {
      type: String,
      enum: ["Pedestrian", "Mobile", null],
      default: null,
    },
    medical: {
      type: String,
      enum: ["none", "Medic", "Paramedic", "Doctor", null],
      default: null,
    },
  },
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
          "Other"
        ],
      },
      found: { type: String },
      information: { type: String },
      default: [],
    },
  ],
});
module.exports = mongoose.model("User", userSchema);
