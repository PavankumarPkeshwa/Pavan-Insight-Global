const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const { v4: uuid4 } = require("uuid");
const Article = require("../models/articleModel"); // ensure path is correct

const articles = [
  {
    _id: new mongoose.Types.ObjectId(),
    title: "The Future of Smart Cities: How AI is Revolutionizing Urban Planning",
    excerpt: "AI is shaping the cities of tomorrow through intelligent infrastructure and data-driven design.",
    content: "Full detailed content about AI in urban planning...",
    author: "Sarah Johnson",
    category: "technology",
    imageUrl: "https://images.unsplash.com/photo-1549924231-f129b911e442",
    publishDate: new Date(2024, 11, 15),
    readTime: "8 min read",
    likes: 456,
    isFeatured: true,
    isTrending: false,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Mobile App Development Trends to Watch in 2025",
    excerpt: "Explore emerging technologies shaping mobile development next year.",
    content: "Complete guide on mobile development trends...",
    author: "Mike Chen",
    category: "technology",
    imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766",
    publishDate: new Date(2024, 11, 20),
    readTime: "5 min read",
    likes: 234,
    isFeatured: false,
    isTrending: false,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Minimalist Home Design: Creating Calm in Chaos",
    excerpt: "Tips for simplifying your space and achieving peace at home.",
    content: "Detailed minimalist design philosophy and tips...",
    author: "Emma Davis",
    category: "lifestyle",
    imageUrl: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
    publishDate: new Date(2024, 11, 5),
    readTime: "7 min read",
    likes: 189,
    isFeatured: false,
    isTrending: false,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "NBA Playoffs Heat Up: Underdog Teams Making Waves",
    excerpt: "This year’s playoffs bring surprises as lesser-known teams outperform expectations.",
    content: "Underdog teams making waves in the NBA playoffs...",
    author: "Alex Rodriguez",
    category: "sports",
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&h=600",
    publishDate: new Date(2024, 11, 10),
    readTime: "6 min read",
    likes: 312,
    isFeatured: false,
    isTrending: false,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Marathon Training: Essential Tips for Beginners",
    excerpt: "Start your journey toward completing your first marathon with this beginner guide.",
    content: "Complete marathon training guide...",
    author: "Runner's World",
    category: "fitness",
    imageUrl: "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
    publishDate: new Date(2024, 11, 3),
    readTime: "4 min read",
    likes: 145,
    isFeatured: false,
    isTrending: true,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Morning Yoga Routines for Better Mental Health",
    excerpt: "Daily stretches that improve your mindset and well-being.",
    content: "Yoga for mental health and wellness...",
    author: "Lisa Park",
    category: "fitness",
    imageUrl: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74",
    publishDate: new Date(2024, 11, 8),
    readTime: "4 min read",
    likes: 156,
    isFeatured: false,
    isTrending: false,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "10 Quick Pasta Recipes for Busy Weeknights",
    excerpt: "Whip up delicious pasta dinners in under 30 minutes.",
    content: "10 pasta recipes perfect for weeknights...",
    author: "Chef Maria",
    category: "food",
    imageUrl: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a",
    publishDate: new Date(2024, 11, 6),
    readTime: "3 min read",
    likes: 198,
    isFeatured: false,
    isTrending: true,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Farm-to-Table: Supporting Local Food Systems",
    excerpt: "How locally sourced food benefits health, economy, and environment.",
    content: "Farm-to-table philosophy and benefits...",
    author: "Chef Marcus",
    category: "food",
    imageUrl: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=800&h=600",
    publishDate: new Date(2024, 11, 18),
    readTime: "8 min read",
    likes: 278,
    isFeatured: false,
    isTrending: false,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Hidden Gems: 5 Undiscovered Islands in Southeast Asia",
    excerpt: "Plan your next adventure to these untouched tropical paradises.",
    content: "Explore hidden travel destinations in Asia...",
    author: "Adventure Guide",
    category: "travel",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    publishDate: new Date(2024, 11, 11),
    readTime: "6 min read",
    likes: 89,
    isFeatured: false,
    isTrending: true,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Solo Backpacking Through Europe: A Complete Guide",
    excerpt: "All you need to know about backpacking solo across the continent.",
    content: "Europe backpacking tips and experiences...",
    author: "Jake Wilson",
    category: "travel",
    imageUrl: "https://images.unsplash.com/photo-1524592919790-4a9fbdcdbf2b?auto=format&fit=crop&w=800&h=600",
    publishDate: new Date(2024, 11, 19),
    readTime: "12 min read",
    likes: 445,
    isFeatured: false,
    isTrending: false,
  },
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "PavanInsightGlobal",
    });

    await Article.deleteMany();
    await Article.insertMany(articles);
    console.log("✅ Articles inserted successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error inserting articles:", error);
    process.exit(1);
  }
}

seedDB();
