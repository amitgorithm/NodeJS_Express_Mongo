const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const userRouter = require('./routes/user')

const app = express();
const PORT = 8000;

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware (should be before routes)
app.use((req, res, next) => {
  fs.appendFile("log.txt", `${Date.now()} : ${req.ip} ${req.method} ${req.path}\n`, (err) => {
    if (err) console.error("Logging error:", err);
    next();
  });
});

//Routes
app.use('/user', userRouter);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
