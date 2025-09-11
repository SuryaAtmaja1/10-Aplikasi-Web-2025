const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 500,
    },
    image: String,
    hastags: {
      type: [String],
      enum: [
        "umum",
        "alam",
        "lokal",
        "politik",
        "sosial",
        "ekonomi",
        "teknologi",
      ],
      default: ["umum"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sajak", postSchema);
