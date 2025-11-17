const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },   
    profilePhoto: {
    type: String,         // URL or base64 string
    default: null
  },
  categoryPreference: {
    type: [String],       // array of strings
    default: []           // empty array by default
  },
  googleId: { 
    type: String 
  },
  bio: { 
    type: String 
  },
  address: { 
    type: String 
  },
  password: {
    type: String,
    required: function() { return !this.googleId; },
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  }, 
  refreshTokens: [String]
  }, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports =  mongoose.model("User", userSchema);
