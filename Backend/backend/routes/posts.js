const express = require("express");
const router = express.Router();
const { getPosts, createPost } = require("../controllers/postController");

// GET all posts
router.get("/", getPosts);

// POST a new post
router.post("/", createPost);

module.exports = router;
