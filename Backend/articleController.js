const Article = require("../models/articleModel");

exports.getAllArticles = async (req, res) => {
  try {
    const { category, limit = 20, offset = 0 } = req.query;
    const filter = category ? { category: new RegExp(`^${category}$`, "i") } : {};
    console.log("🔍 Filter used:", filter);
    const articles = await Article.find(filter)
      .sort({ publishDate: -1 })
      .skip(Number(offset))
      .limit(Number(limit));

    res.json(articles.map(article => {
      const a = article.toObject();
      return { ...a, id: a._id };
    }));
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch articles" });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    console.log("Fetching article with ID:", req.params.id);
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    const a = article.toObject();
    res.json({ ...a, id: a._id });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch article" });
  }
};

exports.getFeaturedArticle = async (req, res) => {
  try {
    const article = await Article.findOne({ isFeatured: 1 });
    if (!article) return res.status(404).json({ message: "No featured article found" });
    const a = article.toObject();
    res.json({ ...a, id: a._id });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch featured article" });
  }
};

exports.getTrendingArticles = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3;
    const articles = await Article.find({ isTrending: 1 }).limit(limit);
    res.json(articles.map(article => {
  const a = article.toObject();
  return { ...a, id: a._id };
}));
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch trending articles" });
  }
};

exports.searchArticles = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.status(400).json({ message: "Search query is required" });

    const regex = new RegExp(query, "i");
    const articles = await Article.find({
      $or: [
        { title: regex },
        { excerpt: regex },
        { content: regex },
        { author: regex },
      ],
    });

    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Failed to search articles" });
  }
};

exports.subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    console.log(`Subscribed: ${email}`);
    res.json({ message: "Successfully subscribed to newsletter" });
  } catch (err) {
    res.status(500).json({ message: "Failed to subscribe" });
  }
};
