
const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    Username: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    
    confirmPassword: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    gender:{
        type: String,enum:["Male","Female","Other"],
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    residence:{
        type:String,
        required: true
    },
   
     role:{
                     type:String,
                     enum:["user","admin"],
                     default:"user"
                }
                

});





module.exports = model("User", UserSchema, "users");