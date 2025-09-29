const User = require("../models/userModel");


// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -refreshTokens"); // exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get account owner data
exports.getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password -refreshTokens");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user data
exports.updateUserData = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    // check if email is used by another user
    const existing = await User.findOne({ email });
    if (existing && existing._id.toString() !== req.userId) {
      return res.status(400).json({
        message: "Email already in use by another user",
        errorType: "DuplicateEmail",
        duplicateValue: email
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { name, email, avatar },
      { new: true, runValidators: true }
    ).select("-password -refreshTokens");

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser
    });
  } catch (err) {
    console.error(err);

    // handle Mongo duplicate key error
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Duplicate key error",
        errorType: "DuplicateKey",
        keyValue: err.keyValue
      });
    }

    // other errors
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
};

// Delete user data
exports.deleteUserData = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.userId);
    res.status(200).json({ message: "User account deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};