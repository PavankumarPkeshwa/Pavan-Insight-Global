const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  excerpt: String,
  content: String,
  category: String,
  author: String,
  imageUrl: String,
  publishDate: Date,
  readTime: String,
  likes: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },   
  isTrending: { type: Boolean, default: false },   
});

module.exports = mongoose.model("Article", articleSchema, "articles");
