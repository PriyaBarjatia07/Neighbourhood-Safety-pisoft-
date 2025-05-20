const User = require("../../models/user.model");
const { registrationValidation } = require("../../services/validation_schema");
const jwt=require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
  
    const registerResponse = await registrationValidation.validateAsync(req.body);
    const {email,password,confirmPassword,Username,residence,phone,dob,gender,role} = registerResponse;
    console.log(registerResponse);
  
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      console.log("User already registered");  
      return res.status(400).json({
        message: "User already registered. Please login.",
        isNewUser: false,
      });
    }
    
    

    const newUser = new User({
      Username,
      dob,
      email,
      password,
      confirmPassword,
      phone,
      residence,
      gender,
      role,
      
      
  });

    await newUser.save();

    console.log("User Register Successfully"); 
    return res.status(201).json({
      message: "User registered successfully 🎉",
      success:true,
      
    });
    
    
  } catch (error) {
    next(error);
  }
};

module.exports = register;