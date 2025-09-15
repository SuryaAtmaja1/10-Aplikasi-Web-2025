const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },  
    title: { 
      type: String, 
      required: true 
    },
    content: {
      type: String,
      required: true,
      maxlength: 500,
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
      default: 0 
    },
    commentsCount: { 
      type: Number, 
      default: 0 
    },
    isPublish: { 
      type: Boolean, 
      default: true 
    },
  },
  { timestamps: true }
);

//for searching
SajakSchema.index({ title: 'text', content: 'text', hashtags: 'text' });

module.exports = mongoose.model("Sajak", postSchema);
