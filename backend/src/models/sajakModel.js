const { create } = require("./userModel");
const mongoose = require("mongoose");

const sajakSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true
    },
    image: String,
    hashtags: {
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
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    isPublish: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

sajakSchema.index({ title: "text", content: "text", hashtags: "text" });

module.exports = mongoose.model("Sajak", sajakSchema);
