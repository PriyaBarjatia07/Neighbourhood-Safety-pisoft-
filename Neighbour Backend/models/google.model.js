// const { required, number } = require("joi");
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
  // allowedDoctors: [
  //   {
  //     _id: {
  //       type: Types.ObjectId,
  //       ref: "User",
  //     },
  //     name: String,
  //     email: String,
  //     phone: Number,
  //   },
  // ],

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
  // residence:{
  //     type:String,enum:[Ma],
  //     required: true
  // },
  // bloodGroup:{
  //     type: String,enum:["A+","A-","B+","B-","AB+","AB-","O+","O-"],
  //     required: true
  // }
  // role: {
  //   type: String,
  //   enum: ["user", "patient", "doctor", "admin"],
  // },
});

module.exports = model("GoogleUser", GoogleUserSchema, "GoogleUser");