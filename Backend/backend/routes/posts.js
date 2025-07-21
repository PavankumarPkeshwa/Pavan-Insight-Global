const express = require("express");
const router = express.Router();
const { getPosts, createPost, getSliderPosts } = require("../controllers/postController");

router.get("/", getPosts);
router.get("/slider", getSliderPosts); // ✅ new route
router.post("/", createPost);

module.exports = router;

