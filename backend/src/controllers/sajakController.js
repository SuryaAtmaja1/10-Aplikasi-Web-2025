const Sajak = require("../models/sajakModel");
const stream = require("stream");
const path = require("path");
const { drive } = require("../config/googleDrive.js"); // <-- your Google Drive config

exports.createSajak = async (req, res) => {
  try {
    const { title, content, isPublish } = req.body;

    let tags = req.body["tags[]"];

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
          parents: [process.env.DRIVEID_SAJAK_PHOTO], // put your Drive folder ID here
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

    if (tags && !Array.isArray(tags)) {
      tags = [tags];
    }

    const newSajak = new Sajak({
      authorId: req.userId,
      title,
      content,
      image: imageLink,
      hashtags: tags,
      views: 0,
      likes: 0,
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

exports.editSajak = async (req, res) => {
  try {
    const { id } = req.params; // sajak ID
    const { title, content, tags, isPublish } = req.body;
    const userId = req.userId; // from verifyUser middleware

    // Find the sajak
    const sajak = await Sajak.findById(id);
    if (!sajak) {
      return res.status(404).json({ message: "Sajak not found" });
    }

    //Check if the logged-in user is the author
    if (sajak.authorId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to edit this sajak" });
    }

    let imageLink = sajak.image; // keep old image by default

    // If new image is uploaded
    if (req.file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ message: "Only image files are allowed" });
      }

      // Delete old image from Google Drive if exists
      if (sajak.image) {
        try {
          const oldFileId = sajak.image.match(/id=([^&]+)/)?.[1];
          if (oldFileId) {
            await drive.files.delete({ fileId: oldFileId });
          }
        } catch (deleteErr) {
          console.warn("Failed to delete old image:", deleteErr.message);
        }
      }

      //Upload new image
      const bufferStream = new stream.PassThrough();
      bufferStream.end(req.file.buffer);

      const uploadResponse = await drive.files.create({
        media: {
          mimeType: req.file.mimetype,
          body: bufferStream,
        },
        requestBody: {
          name: "sajak_" + Date.now() + path.extname(req.file.originalname),
          parents: [process.env.DRIVEID_SAJAK_PHOTO], // Drive folder ID
        },
        fields: "id",
      });

      const newFileId = uploadResponse.data.id;

      await drive.permissions.create({
        fileId: newFileId,
        requestBody: { role: "reader", type: "anyone" },
      });

      imageLink = `https://drive.google.com/uc?export=view&id=${newFileId}`;
    }

    // 3. Update fields
    sajak.title = title || sajak.title;
    sajak.content = content || sajak.content;
    sajak.hashtags = tags || sajak.hashtags;
    sajak.isPublish = typeof isPublish === "boolean" ? isPublish : sajak.isPublish;
    sajak.image = imageLink;

    await sajak.save();

    return res.status(200).json({
      message: "Sajak updated successfully",
      sajak,
    });
  } catch (err) {
    console.error("Error editing sajak:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

exports.getSajakByUser = async (req, res) => {
  try {
    const userId = req.params.userId; // ambil userId dari URL

    const sajakList = await Sajak.find({ authorId: userId })
      .sort({ createdAt: -1 }); // urutkan dari terbaru ke lama

    if (!sajakList || sajakList.length === 0) {
      return res.status(404).json({ message: "User belum menulis sajak" });
    }

    return res.status(200).json(sajakList);
  } catch (error) {
    console.error("Error fetching sajak by user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getSajakById = async (req, res) => {
  try {
    const sajakId = req.params.id;

    // Tambahkan 1 ke views dan kembalikan dokumen terbaru
    const sajak = await Sajak.findByIdAndUpdate(
      sajakId,
      { $inc: { views: 1 } },  // increment views by 1
      { new: true }            // return updated document
    );

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
    // set time range
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const trendingSajak = await Sajak.find({
      createdAt: { $gte: sevenDaysAgo }, // only from the last 7 days
    })
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
    const userId = req.userId; // set by verifyUser middleware

    // Find sajak
    const sajak = await Sajak.findById(id);
    if (!sajak) {
      return res.status(404).json({ message: "Sajak not found" });
    }

    // Check if the logged-in user is the owner
    if (sajak.authorId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this sajak" });
    }

    await sajak.deleteOne();

    return res.status(200).json({
      message: "Sajak deleted successfully",
      data: sajak,
    });
  } catch (error) {
    console.error("Error deleting sajak:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// Search Sajak (still based on content and title)
exports.searchSajak = async (req, res) => {
  try {
    const { query } = req.query; // e.g. /sajaks/search?query=love

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Search in title or content (case-insensitive)
    const sajakList = await Sajak.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    }).populate("authorId", "name profilePhoto"); // optional: populate author info

    if (sajakList.length === 0) {
      return res.status(404).json({ message: "No sajak found" });
    }

    res.status(200).json({
      message: "Search results",
      count: sajakList.length,
      sajak: sajakList,
    });
  } catch (err) {
    console.error("Error searching sajak:", err);
    res.status(500).json({ message: "Server error" });
  }
};
