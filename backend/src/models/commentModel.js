const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sajak",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
      parent: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Comment", 
        default: null 
    }, // for replies
    text: {
      type: String,
      required: true,
      maxlength: 300,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
