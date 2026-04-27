const prisma = require("../lib/prisma");

async function isOwner(req, res, next) {
  try {
    const id = Number(req.params.id);

    const question = await prisma.question.findUnique({
      where: { id },
    });

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    if (question.userId !== req.user.id) {
      return res.status(403).json({
        error: "You can only modify your own questions",
      });
    }

    req.question = question;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = isOwner;