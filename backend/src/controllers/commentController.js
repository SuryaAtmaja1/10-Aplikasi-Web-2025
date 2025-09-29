const Comment = require("../models/commentModel");
const Sajak = require("../models/sajakModel");

// Add a comment to a sajak
exports.addComment = async (req, res) => {
  try {
    const { text, parentId } = req.body;
    const postId = req.params.id?.trim(); // get Sajak ID from URL
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid Sajak ID" });
    }

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Comment text is required" });
    }

    // Find Sajak (works even if Mongoose pluralized collection)
    const sajak = await Sajak.findById(postId);
    if (!sajak) {
      return res.status(404).json({ message: "Sajak not found" });
    }

    const comment = new Comment({
      post: postId,
      authorId: req.userId,
      parent: parentId || null,
      text: text.trim(),
    });

    await comment.save();

    res.status(201).json({
      message: "Comment created successfully",
      comment,
    });
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ message: "Server error", error: err.message });
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
exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.userId; // from verifyUser middleware

    if (!commentId) {
      return res.status(400).json({ message: "Comment ID is required" });
    }

    // Find the comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Only allow the author to delete
    if (comment.authorId.toString() !== userId) {
      return res.status(403).json({ message: "You are not allowed to delete this comment" });
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};