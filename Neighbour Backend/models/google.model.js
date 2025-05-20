
const { Schema, model, Types } = require("mongoose");

const GoogleUserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  dob: {
    type: Date,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  

  confirmPassword: {
    type: String,
  },
  gender: {
    type: String,
  },
  phone: {
    type: Number,
    default: "",
  },
  
});

module.exports = model("GoogleUser", GoogleUserSchema, "GoogleUser");