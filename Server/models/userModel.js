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
  phone: { type: Number, unique: true, required: true },
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
});
module.exports = mongoose.model("User", userSchema);
