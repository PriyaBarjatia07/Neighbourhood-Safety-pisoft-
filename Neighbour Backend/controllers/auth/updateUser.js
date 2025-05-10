const User = require("../../models/user.model");

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id; // :id from URL
    const updateData = req.body;

    // Optional: Don't allow password change here
    delete updateData.password;
    delete updateData.confirmPassword;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error while updating user" });
  }
};

module.exports = updateUser;