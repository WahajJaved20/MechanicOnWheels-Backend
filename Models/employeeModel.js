const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    unique: this.email != "" ? true : false,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
  },
  accessLevel: {
    type: String,
    default: "user",
  },
  age: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  phoneNumber: {
    type: String
  }
});

module.exports = mongoose.model("employees", EmployeeSchema);