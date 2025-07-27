const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");

router.get("/articles", articleController.getAllArticles);
router.get("/articles/:id", articleController.getArticleById);
router.get("/featured", articleController.getFeaturedArticle);
router.get("/trending", articleController.getTrendingArticles);
router.get("/search", articleController.searchArticles);
router.post("/newsletter", articleController.subscribeNewsletter);

module.exports = router;
