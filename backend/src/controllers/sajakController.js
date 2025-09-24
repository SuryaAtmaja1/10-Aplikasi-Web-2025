const Sajak = require("../models/sajakModel");

exports.createSajak = async (req, res) => {
  const { title, content, tags } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required." });
  }

  const newSajak = new Sajak({
    authorId: req.userId,
    title,
    content,
    image: req.body.image,
    hastags: tags,
    views: 0,
    commentsCount: 0,
    isPublish: req.body.isPublish || false,
    createdAt: new Date(),
  });

  await newSajak.save();

  // Respon sukses dengan data sajak baru
  return res.status(201).json({
    message: "Sajak created successfully",
    sajak: newSajak,
  });
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
