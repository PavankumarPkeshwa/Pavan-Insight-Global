const express = require("express");
const mongoose = require("mongoose");
const articleRoutes = require("./routes/articleRoutes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", articleRoutes);

// Global error handler
app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message || "Something went wrong" });
});

module.exports = app;
