require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/blogDB";

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");

    // 🧪 Count articles in the database
    const count = await mongoose.connection.db.collection("articles").countDocuments();
    console.log("📄 Total articles in DB:", count); // 👈 This will show 0 if nothing is there

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
