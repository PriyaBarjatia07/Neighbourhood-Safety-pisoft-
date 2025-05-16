require("dotenv").config();
const nodemailer = require("nodemailer");
const OtpModel = require("../../models/otpModel");


const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Neighbourhood Admin" <${process.env.GMAIL_ID}>`,
      to: email,
      subject: "Your OTP for Password Reset",
      html: `<h3>Your OTP is: <b>${otp}</b></h3><p>Valid for 10 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);

    // Store OTP in DB
    await OtpModel.findOneAndUpdate(
      { email },
      { otp, createdAt: Date.now() },
      { upsert: true, new: true }
    );

    return res.status(200).json({ message: "OTP sent to your email." });

  } catch (err) {
    console.error("Error sending OTP:", err.message);
    return res.status(500).json({ message: "Failed to send OTP." });
  }
};

module.exports = forgotPassword;
