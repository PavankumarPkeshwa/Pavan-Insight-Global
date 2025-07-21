const Post = require("../models/Post");

// GET all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

// GET latest 3 posts for slider
const getSliderPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }).limit(3);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching slider posts", error });
  }
};

// POST a new post
const createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

module.exports = { getPosts, createPost, getSliderPosts };
