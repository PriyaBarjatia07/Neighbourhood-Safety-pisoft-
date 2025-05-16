// const axios = require("axios");
// const jwt = require("jsonwebtoken");
// const { oauth2Client } = require("../../utils/googleClient");
// const googleUser = require("../../models/google.model");

// const googleLogin = async (req, res, next) => {
//     try {
//         const code = req.query.code;
//         console.log(code)

//         console.log("yeh aya code frontend say", code);
//         const googleRes = await oauth2Client.getToken(code);
//         console.log("yeh raha google res", googleRes.tokens.access_token);
//         oauth2Client.setCredentials(googleRes.tokens.access_token);
//         const userRes = await axios.get(
//             `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
//         );
//         const { email, name } = userRes.data;
//         console.log("yeh ha user res", userRes.data);

//         // const existingUser = await User.findOne({
//         //     email    });

//         // if (existingUser) {
//         //     console.log("User already registered");  // ✅ Log before sending response
//         //     return res.status(400).json({
//         //       message: "User already registered. Please login.",
//         //       isNewUser: false,
//         //     });
//         //   }
//         const newUser = new googleUser({
//             username: name,
//             dob: "",
//             email,
//             password: "",
//             confirmPassword: "",
//             phone: "",
//             // bloodGroup,
//             gender: "",
//             // token:jwtToken
//         });
//         console.log("new", newUser,)
//         await newUser.save();
//         // let user = await Google.findOne({ email });

//         // if (!user) {
//         //     user = await Google.create({
//         //         name,
//         //         email,
//         //         image: picture,
//         //     });
//         // }

//         // const { _id } = user;
//         // const token = jwt.sign({ _id, email },
//         //     process.env.JWT_SECRET, {
//         //     expiresIn: process.env.JWT_TIMEOUT,
//         // });


//         return res.status(200).json({
//             userInfo: userRes.data,
//             message: "success",
//             token: "123456789",
//             role: role
//         });
//     } catch (err) {
//         next(err)
//         console.log(err)

//         return res.status(500).json({
//             message: "Internal Server Error",
//         });
//     }
// };
// module.exports = googleLogin;


const axios = require("axios");
const jwt = require("jsonwebtoken");
const { oauth2Client } = require("../../utils/googleClient");
const googleUser = require("../../models/google.model");

const googleLogin = async (req, res, next) => {
    try {
        const code = req.query.code;
        console.log(code)

        console.log("yeh aya code frontend say", code);
        const googleRes = await oauth2Client.getToken(code);
        console.log("yeh raha google res", googleRes.tokens.access_token);
        oauth2Client.setCredentials(googleRes.tokens.access_token);
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );
        const { email, name } = userRes.data;
        console.log("yeh ha user res", userRes.data);

        // const existingUser = await User.findOne({
        //     email    });

        // if (existingUser) {
        //     console.log("User already registered");  // ✅ Log before sending response
        //     return res.status(400).json({
        //       message: "User already registered. Please login.",
        //       isNewUser: false,
        //     });
        //   }
        const newUser = new googleUser({
            username: name,
            dob: "",
            email,
            password: "",
            confirmPassword: "",
            phone: "",
            // bloodGroup,
            gender: "",
            // token:jwtToken
        });
        console.log("new", newUser,)
        await newUser.save();
        // let user = await Google.findOne({ email });

        // if (!user) {
        //     user = await Google.create({
        //         name,
        //         email,
        //         image: picture,
        //     });
        // }

        // const { _id } = user;
        // const token = jwt.sign({ _id, email },
        //     process.env.JWT_SECRET, {
        //     expiresIn: process.env.JWT_TIMEOUT,
        // });


        return res.status(200).json({
            userInfo: userRes.data,
            message: "success",
            token: "123456789",
            // role: role
        });
    } catch (err) {
        next(err)
        console.log(err)

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
module.exports = googleLogin;