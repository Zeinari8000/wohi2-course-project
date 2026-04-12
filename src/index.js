const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const postsRouter = require("./routes/posts");

// Middleware
app.use(express.json());

// Routes
app.use("/api/posts", postsRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ msg: "Not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});