const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnail: { type: String }, // for the main image preview
  author: { type: String, default: "Anonymous" },
  date: { type: String, default: () => new Date().toISOString() },
  content: { type: String, required: true }, // markdown / HTML body
  inlineImage: { type: String }, // optional inline img in content
  description: { type: String } // short summary for "RecentPosts"
});
  
module.exports = mongoose.model("Post", PostSchema);
