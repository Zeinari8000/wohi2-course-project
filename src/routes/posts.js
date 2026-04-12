const express = require("express");
const router = express.Router();

const posts = require("../data/posts");

// GET /posts
router.get("/", (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.json(posts);
  }

  const filteredPosts = posts.filter(post =>
    post.question.toLowerCase().includes(keyword.toLowerCase())
  );

  res.json(filteredPosts);
});

// GET /posts/:postId
router.get("/:postId", (req, res) => {
  const postId = Number(req.params.postId);

  const post = posts.find(p => p.id === postId);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json(post);
});

// POST /posts
router.post("/", (req, res) => {
  const { question, answer } = req.body;

  // tarkistus
  if (!question || !answer) {
    return res.status(400).json({
      message: "question and answer are required"
    });
  }

  const maxId = Math.max(...posts.map(p => p.id), 0);

  const newPost = {
    id: posts.length ? maxId + 1 : 1,
    question,
    answer
  };

  posts.push(newPost);

  res.status(201).json(newPost);
});
// PUT /posts/:postId
router.put("/:postId", (req, res) => {
  const postId = Number(req.params.postId);
  const { question, answer } = req.body;

  const post = posts.find(p => p.id === postId);

  // jos ei löydy
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  // tarkistus
  if (!question || !answer) {
    return res.status(400).json({
      message: "question and answer are required"
    });
  }

  // päivitä
  post.question = question;
  post.answer = answer;

  res.json(post);
});

// DELETE /posts/:postId
router.delete("/:postId", (req, res) => {
  const postId = Number(req.params.postId);

  const postIndex = posts.findIndex((p) => p.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  const deletedPost = posts.splice(postIndex, 1);

  res.json({
    message: "Post deleted successfully",
    post: deletedPost[0]
  });
});

module.exports = router;