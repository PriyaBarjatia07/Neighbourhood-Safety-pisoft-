const User = require("../../models/user.model");
const { registrationValidation } = require("../../services/validation_schema");
const jwt=require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    // const accessSecret=process.env.ACCESS_TOKEN_SECRET
    // console.log("accessSecret",accessSecret)
    const registerResponse = await registrationValidation.validateAsync(req.body);
    const {email,password,confirmPassword,Username,residence,phone,dob,gender,role} = registerResponse;
    console.log(registerResponse);
  //   const userInfo=(
  //     Username,
  //     dob,
  //     email,
  //     password,
  //     confirmPassword,
  //     residence,
  //     phone,
  //     gender,
  //     role
      
  // );
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      console.log("User already registered");  // ✅ Log before sending response
      return res.status(400).json({
        message: "User already registered. Please login.",
        isNewUser: false,
      });
    }
    
    // const jwtToken=jwt.sign(userInfo,accessSecret)

    const newUser = new User({
      Username,
      dob,
      email,
      password,
      confirmPassword,
      phone,
      residence,
      // bloodGroup,
      gender,
      role,
      // token:jwtToken
      
  });

    await newUser.save();

    console.log("User Register Successfully"); 
    return res.status(201).json({
      message: "User registered successfully 🎉",
      success:true,
      // message: "User Registered successfully 🎉",
      // isNewUser: true,
      // Username: newUser.Username,
      // email: newUser.email,
      // redirectTo: "/login",
    });
    
    
  } catch (error) {
    next(error);
  }
};

module.exports = register;