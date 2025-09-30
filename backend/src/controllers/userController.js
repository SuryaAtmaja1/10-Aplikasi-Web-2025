const User = require("../models/userModel");
const stream = require("stream");
const path = require("path");
const { drive } = require("../config/googleDrive.js"); // <-- your Google Drive config

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
    const { username, email, categoryPreference } = req.body;

    // check if email is used by another user
    const existing = await User.findOne({ email });
    if (existing && existing._id.toString() !== req.userId) {
      return res.status(400).json({
        message: "Email already in use by another user",
        errorType: "DuplicateEmail",
        duplicateValue: email,
      });
    }

    // fetch current user to check old photo
    const currentUser = await User.findById(req.userId);

    let profilePhotoLink = null;

    if (req.file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ message: "Only image files are allowed" });
      }

      // 🔹 Step 1: delete old profile photo if exists
      if (currentUser.profilePhoto) {
        try {
          const oldFileId = currentUser.profilePhoto.match(/id=([^&]+)/)?.[1];
          if (oldFileId) {
            await drive.files.delete({ fileId: oldFileId });
          }
        } catch (deleteErr) {
          console.warn("Failed to delete old profile photo:", deleteErr.message);
        }
      }

      // 🔹 Step 2: upload new photo
      const bufferStream = new stream.PassThrough();
      bufferStream.end(req.file.buffer);

      const uploadResponse = await drive.files.create({
        media: {
          mimeType: req.file.mimetype,
          body: bufferStream,
        },
        requestBody: {
          name: "profile_" + req.userId + path.extname(req.file.originalname),
          parents: [process.env.DRIVEID_PROFILE_PHOTO], // replace with your Drive folder ID
        },
        fields: "id",
      });

      const newFileId = uploadResponse.data.id;

      await drive.permissions.create({
        fileId: newFileId,
        requestBody: { role: "reader", type: "anyone" },
      });

      profilePhotoLink = `https://drive.google.com/uc?export=view&id=${newFileId}`;
    }

    // build update fields dynamically
    const updateFields = { username, email };
    if (profilePhotoLink) updateFields.profilePhoto = profilePhotoLink;
    if (categoryPreference) {
      updateFields.preferenceCategory = Array.isArray(categoryPreference)
        ? categoryPreference
        : [categoryPreference];
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      updateFields,
      { new: true, runValidators: true }
    ).select("-password -refreshTokens");

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error updating user:", err);

    if (err.code === 11000) {
      return res.status(400).json({
        message: "Duplicate key error",
        errorType: "DuplicateKey",
        keyValue: err.keyValue,
      });
    }

    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};


exports.deleteUserData = async (req, res) => {
  try {
    // Find the user first
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete profile photo from Google Drive if exists
    if (user.profilePhoto) {
      try {
        const oldFileId = user.profilePhoto.match(/id=([^&]+)/)?.[1];
        if (oldFileId) {
          await drive.files.delete({ fileId: oldFileId });
        }
      } catch (deleteErr) {
        console.warn("Failed to delete profile photo:", deleteErr.message);
      }
    }

    // Delete user document
    await User.findByIdAndDelete(req.userId);

    res.status(200).json({ message: "User account and profile photo deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Server error" });
  }
};
