const express = require("express");
const router = express.Router();

const questions = require("../data/questions");

// GET /questions
// Returns all questions or filters by keyword
router.get("/", (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.json(questions);
  }

  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(keyword.toLowerCase())
  );

  res.json(filteredQuestions);
});

// GET /questions/:questionId
// Returns one question by id
router.get("/:questionId", (req, res) => {
  const questionId = Number(req.params.questionId);

  const question = questions.find(q => q.id === questionId);

  if (!question) {
    return res.status(404).json({ message: "Question not found" });
  }

  res.json(question);
});

// POST /questions
// Creates a new question
router.post("/", (req, res) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({
      message: "question and answer are required"
    });
  }

  const maxId = Math.max(...questions.map(q => q.id), 0);

  const newQuestion = {
    id: questions.length ? maxId + 1 : 1,
    question,
    answer
  };

  questions.push(newQuestion);

  res.status(201).json(newQuestion);
});

// PUT /questions/:questionId
// Updates an existing question
router.put("/:questionId", (req, res) => {
  const questionId = Number(req.params.questionId);
  const { question, answer } = req.body;

  const existingQuestion = questions.find(q => q.id === questionId);

  if (!existingQuestion) {
    return res.status(404).json({ message: "Question not found" });
  }

  if (!question || !answer) {
    return res.status(400).json({
      message: "question and answer are required"
    });
  }

  existingQuestion.question = question;
  existingQuestion.answer = answer;

  res.json(existingQuestion);
});

// DELETE /questions/:questionId
// Deletes a question by id
router.delete("/:questionId", (req, res) => {
  const questionId = Number(req.params.questionId);

  const questionIndex = questions.findIndex(q => q.id === questionId);

  if (questionIndex === -1) {
    return res.status(404).json({ message: "Question not found" });
  }

  const deletedQuestion = questions.splice(questionIndex, 1);

  res.json({
    message: "Question deleted successfully",
    question: deletedQuestion[0]
  });
});

module.exports = router;