const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String, // base64 string or image URL
  },
  author: {
    type: String,
    default: "Anonymous",
  },
  date: {
    type: String, // Can use Date type if needed
    default: () => new Date().toISOString(),
  },
  content: {
    type: String,
    required: true,
  },
  inlineImage: {
    type: String, // Optional inline image in post body
  },
});

module.exports = mongoose.model("Post", PostSchema);
