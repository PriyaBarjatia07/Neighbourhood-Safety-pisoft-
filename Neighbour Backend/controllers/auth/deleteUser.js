const User = require("../../models/user.model");

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; 

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Server error while deleting user" });
  }
};

module.exports = deleteUser;
