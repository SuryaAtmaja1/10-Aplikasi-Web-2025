const Sajak = require("../models/sajakModel");
const stream = require("stream");
const path = require("path");
const { drive } = require("../config/googleDrive.js"); // <-- your Google Drive config

exports.createSajak = async (req, res) => {
  try {
    const { title, content, tags, isPublish } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required." });
    }

    let imageLink = null;

    if (req.file) {
      // Only allow image types (png, jpg, jpeg, gif)
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ message: "Only image files are allowed" });
      }

      // Convert buffer into a stream
      const bufferStream = new stream.PassThrough();
      bufferStream.end(req.file.buffer);

      // Upload directly to Google Drive
      const uploadResponse = await drive.files.create({
        media: {
          mimeType: req.file.mimetype,
          body: bufferStream,
        },
        requestBody: {
          name: "sajak_" + Date.now() + path.extname(req.file.originalname),
          parents: ["1BxT26NHF1TdX5HyZ1mQtY3YLtz5a-ZYs"], // put your Drive folder ID here
        },
        fields: "id",
      });

      const newFileId = uploadResponse.data.id;

      // Make file public
      await drive.permissions.create({
        fileId: newFileId,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });

      // Get the public link
      imageLink = `https://drive.google.com/uc?export=view&id=${newFileId}`;
    }

    const newSajak = new Sajak({
      authorId: req.userId,
      title,
      content,
      image: imageLink,
      hastags: tags,
      views: 0,
      commentsCount: 0,
      isPublish: isPublish || true,
      createdAt: new Date(),
    });

    await newSajak.save();

    return res.status(201).json({
      message: "Sajak created successfully",
      sajak: newSajak,
    });
  } catch (err) {
    console.error("Error creating sajak:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

exports.getSajakById = async (req, res) => {
  try {
    const sajakId = req.params.id;

    // Cari sajak di DB berdasarkan ID
    const sajak = await Sajak.findById(sajakId);

    // Jika tidak ada
    if (!sajak) {
      return res.status(404).json({ message: "Sajak not found" });
    }

    // Jika ada, kirim respon
    return res.status(200).json(sajak);
  } catch (error) {
    console.error("Error fetching sajak by ID:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get trending sajak
exports.getTrending = async (req, res) => {
  try {
    const trendingSajak = await Sajak.find()
      .sort({ views: -1, commentCount: -1 })
      .limit(10);

    if (!trendingSajak || trendingSajak.length === 0) {
      return res.status(404).json({ message: "No trending sajak found" });
    }

    return res.status(200).json({
      message: "Trending sajak",
      data: trendingSajak,
    });
  } catch (error) {
    console.error("Error fetching trending sajak:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getTrendingByTag = async (req, res) => {
  try {
    const { tag } = req.params;

    if (!tag) {
      return res.status(400).json({ message: "Tag is required" });
    }

    // perbaikan: pakai 'hashtags' (bukan 'hastags')
    const trendingSajak = await Sajak.find({ hashtags: tag })
      .sort({ views: -1, commentsCount: -1 }) // sesuaikan juga field commentsCount
      .limit(10);

    if (!trendingSajak || trendingSajak.length === 0) {
      return res
        .status(404)
        .json({ message: "No trending sajak found for this tag" });
    }

    return res.status(200).json({
      message: `Trending sajak for tag: ${tag}`,
      data: trendingSajak,
    });
  } catch (error) {
    console.error("Error fetching trending sajak:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get sajak by tag
exports.getSajakByTag = async (req, res) => {
  try {
    const { tag } = req.params;

    if (!tag) {
      return res.status(400).json({ message: "Tag is required" });
    }

    const sajakList = await Sajak.find({ hashtags: tag }).sort({
      createdAt: -1,
    });

    if (!sajakList || sajakList.length === 0) {
      return res
        .status(404)
        .json({ message: `No sajak found for tag: ${tag}` });
    }

    return res.status(200).json({
      message: `Sajak for tag: ${tag}`,
      data: sajakList,
    });
  } catch (error) {
    console.error("Error fetching sajak by tag:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get recent sajak
exports.getRecentSajak = async (req, res) => {
  try {
    const recentSajak = await Sajak.find().sort({ createdAt: -1 }).limit(10);

    if (!recentSajak || recentSajak.length === 0) {
      return res.status(404).json({ message: "No recent sajak found" });
    }

    return res.status(200).json({
      message: "Recent sajak",
      data: recentSajak,
    });
  } catch (error) {
    console.error("Error fetching recent sajak:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete sajak
exports.deleteSajak = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSajak = await Sajak.findByIdAndDelete(id);

    if (!deletedSajak) {
      return res.status(404).json({ message: "Sajak not found" });
    }

    return res.status(200).json({
      message: "Sajak deleted successfully",
      data: deletedSajak,
    });
  } catch (error) {
    console.error("Error deleting sajak:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
