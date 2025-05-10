// const User = require("../../models/user.model");
// const { loginValidation } = require("../../services/validation_schema");
// const jwt = require("jsonwebtoken");
// const login = async (req, res, next) => {
//   try {
//     console.log('loginvalidation:',loginValidation);
//     const loginResponse = await loginValidation.validateAsync(req.body);
//     console.log(loginResponse);
//     const { email, password } = loginResponse;

//     const existingUser = await User.findOne({email})
//     // const existingPassword = await User.findOne({ password })

//     // console.log("existingEmail", existingUser.email);
//     // console.log("existingPassword", existingPassword.password);
//     //  console.log("existingUser", existingUser.Username);


//     if (!existingUser) {
//       return res.status(200).json({
//         success: false,
//         message: "Invalid Email Address. Please register.",
//         // isNewUser: false,
//       });
//     }
//   console.log("existingEmail", existingUser.email);
//      console.log("existingPassword", existingPassword.password);
//       console.log("existingUser", existingUser.Username);

//     const passwordMatching = password === existingPassword.password;
//     console.log("passwordMatching",passwordMatching)


//     return res.status(201).json({
//       success: true,
//       message: "Login successfully",
//       // isNewUser: true,
//       Username: existingUser.Username,
//       email: existingUser.email,
//       // redirectTo: "/dashboard",
//     });

//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = login;
const User = require("../../models/user.model");
const { loginValidation } = require("../../services/validation_schema");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  try {
    console.log("entered login endpoint.......");

    // Validate user input
    const loginResponse = await loginValidation.validateAsync(req.body);
    console.log(loginResponse);
    const { email, password } = loginResponse;

    // Check if user exists
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

    // Check if password is correct
    if (password !== existingUser.password) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password. Please try again.",
      });
    }

    // Generate JWT token
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
      token, // Sending the token to the frontend
      redirectTo: "/dashboard",
    });
  } catch (error) {
    next(error);
  }
};

// // Get all users
// exports.getUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json({ success: true, data: users });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error fetching users." });
//   }
// };

module.exports = login;