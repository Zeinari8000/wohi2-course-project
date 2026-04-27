const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Luo user
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      password: "1234",
      name: "Test User",
    },
  });

  console.log("Created user:", user.email);

  // Luo kysymykset tälle userille
  const questions = [
    {
      question: "What is the capital of Finland?",
      answer: "Helsinki",
    },
    {
      question: "What is 2 + 2?",
      answer: "4",
    },
    {
      question: "What language runs in the browser?",
      answer: "JavaScript",
    },
  ];

  for (const q of questions) {
    await prisma.question.create({
      data: {
        question: q.question,
        answer: q.answer,
        userId: user.id,
      },
    });
  }

  console.log("Seeded questions");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());