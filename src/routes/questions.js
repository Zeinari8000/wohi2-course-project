const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");

// GET kaikki kysymykset
router.get("/", async (req, res) => {
  try {
    const questions = await prisma.question.findMany({
      orderBy: { id: "asc" },
    });

    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET yksi kysymys
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const question = await prisma.question.findUnique({
      where: { id },
    });

    if (!question) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(question);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST uusi kysymys
router.post("/", async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        message: "question and answer required",
      });
    }

    const newQuestion = await prisma.question.create({
      data: { question, answer },
    });

    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT päivitä kysymys
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { question, answer } = req.body;

    const existing = await prisma.question.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ message: "Not found" });
    }

    const updated = await prisma.question.update({
      where: { id },
      data: { question, answer },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE kysymys
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.question.delete({
      where: { id },
    });

    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;