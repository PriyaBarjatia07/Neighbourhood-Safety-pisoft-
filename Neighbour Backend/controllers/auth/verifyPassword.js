const OtpModel = require("../../models/otpModel");
const UserModel = require("../../models/user.model");

const verifyPassword = async (req, res) => {
  const { email, otp, newPassword, confirmPassword } = req.body;

  if (!email || !otp || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    
    const existingOtp = await OtpModel.findOne({ email });

    if (!existingOtp || existingOtp.otp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    
    const isExpired = Date.now() - new Date(existingOtp.createdAt).getTime() > 10 * 60 * 1000;
    if (isExpired) {
      return res.status(400).json({ message: "OTP expired. Please request a new one." });
    }

    
    const user = await UserModel.findOneAndUpdate(
      { email },
      { password: confirmPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    
    await OtpModel.deleteOne({ email });

    res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    console.error("Error resetting password:", error.message);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

module.exports = verifyPassword;
