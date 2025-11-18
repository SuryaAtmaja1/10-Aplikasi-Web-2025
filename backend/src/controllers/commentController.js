const Comment = require("../models/commentModel");
const Sajak = require("../models/sajakModel");
const mongoose = require("mongoose");

// Add a comment or reply comment in a sajak
exports.addCommentOrReply = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: sajakId, commentId } = req.params;

    // Validate sajakId
    if (!mongoose.Types.ObjectId.isValid(sajakId)) {
      return res.status(400).json({ message: "Invalid Sajak ID" });
    }

    // Check text
    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Comment text is required" });
    }

    // Ensure sajak exists
    const sajak = await Sajak.findById(sajakId);
    if (!sajak) {
      return res.status(404).json({ message: "Sajak not found" });
    }

    // If commentId exists, it's a reply
    let parentComment = null;
    if (commentId) {
      if (!mongoose.Types.ObjectId.isValid(commentId)) {
        return res.status(400).json({ message: "Invalid Comment ID" });
      }
      parentComment = await Comment.findById(commentId);
      if (!parentComment) {
        return res.status(404).json({ message: "Parent comment not found" });
      }
    }

    const newComment = new Comment({
      post: sajakId,
      authorId: req.userId,
      parent: parentComment ? parentComment._id : null,
      text: text.trim(),
    });

    await newComment.save();

    res.status(201).json({
      message: parentComment ? "Reply added successfully" 
      : "Comment added successfully",
      comment: newComment,
      commentsCount: sajak.commentsCount, // kirim balik agar frontend dapat langsung update
    });
  } catch (err) {
    console.error("Error adding comment/reply:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all comments by sajak id
exports.getComments = async (req, res) => {
  try {
    const { id: sajakId } = req.params;

    if (!sajakId) {
      return res.status(400).json({ message: "Sajak ID is required" });
    }

    const comments = await Comment.find({ post: sajakId })
      .populate("authorId", "username email")
      .sort({ createdAt: -1 })
      .lean(); // Convert Mongoose docs to plain JS objects

    // Build nested comment tree
    const commentMap = {};
    const roots = [];

    comments.forEach((c) => {
      c.replies = []; // initialize replies array
      commentMap[c._id] = c;
    });

    comments.forEach((c) => {
      if (c.parent) {
        // If comment has a parent, push into parent's replies
        const parent = commentMap[c.parent];
        if (parent) parent.replies.push(c);
      } else {
        // Otherwise it's a root comment
        roots.push(c);
      }
    });

    res.status(200).json(roots); // send nested comments
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
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
    
    // reduce commentsCount
    await Sajak.findByIdAndUpdate(comment.post, {
      $inc: { commentsCount: -1 },
      deletedCount: 1,
    });

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};