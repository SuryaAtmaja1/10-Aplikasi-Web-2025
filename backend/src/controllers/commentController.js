const Comment = require("../models/commentModel");
const Sajak = require("../models/sajakModel");

// Add a comment to a sajak
exports.addComment = async (req, res) => {
  try {
    const { postId, text, parentId } = req.body;

    if (!postId || !text) {
      return res.status(400).json({ message: "Post ID and text are required" });
    }

    const sajak = await Sajak.findById(postId);
    if (!sajak) {
      return res.status(404).json({ message: "Sajak not found" });
    }

    const comment = new Comment({
      post: postId,
      authorId: req.user._id,
      parent: parentId || null,
      text,
    });

    await comment.save();

    res.status(201).json({
      message: "Comment created successfully",
      comment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all comments by sajak id
exports.getComments = async (req, res) => {
  try {
    const { sajakId } = req.params;

    if (!sajakId) {
      return res.status(400).json({ message: "Sajak ID is required" });
    }

    const comments = await Comment.find({ post: sajakId })
      .populate("authorId", "username email")
      .populate("parent", "_id")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// reply a comment to a sajak
exports.replyComment = async (req, res) => {
};

// Delete a specific comment by id
exports.deleteComment = (req, res) => {};
