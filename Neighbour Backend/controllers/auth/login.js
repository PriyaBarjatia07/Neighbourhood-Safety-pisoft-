
const User = require("../../models/user.model");
const { loginValidation } = require("../../services/validation_schema");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  try {
    console.log("entered login endpoint.......");

    
    const loginResponse = await loginValidation.validateAsync(req.body);
    console.log(loginResponse);
    const { email, password } = loginResponse;

    
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email Address. Please register.",
      });
    }

    console.log("existingEmail", existingUser.email);
    console.log("existingPassword", existingUser.password);
    console.log("existingUser", existingUser.Username);

    
    if (password !== existingUser.password) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password. Please try again.",
      });
    }

    
    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      "your_secret_key",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful 🎉",
      Username: existingUser.Username,
      email: existingUser.email,
      token, 
      redirectTo: "/dashboard",
    });
  } catch (error) {
    next(error);
  }
};



module.exports = login;