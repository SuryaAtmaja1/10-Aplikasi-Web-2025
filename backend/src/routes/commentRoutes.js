const express = require("express");
const router = express.Router({ mergeParams: true }); // 👈 important!

const {
  addCommentOrReply,      // POST  /sajak/:id/comments
  getComments,     // GET   /sajak/:id/comments
  deleteComment,   // DELETE /sajak/:id/comments/:commentId
} = require("../controllers/commentController");
const { verifyUser } = require("../middlewares/auth");

// Add a comment to a sajak
router.post("/", verifyUser, addCommentOrReply);

// Get all comments for a sajak
router.get("/", getComments);

// Reply a specific comment by id
router.post("/:commentId", verifyUser, addCommentOrReply);

// Delete a specific comment by id
router.delete("/:commentId", verifyUser, deleteComment);

module.exports = router;