const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName: {type: String, unique: true},
    email: {type: String, unique: true
        , validate: {
        validator: v => /.@./.test(v),
        message: "Email must contain @"
    }},
    password: {type: String},
})
module.exports = mongoose.model("User", userSchema)