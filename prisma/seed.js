const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

async function main() {
  await prisma.question.deleteMany();

  for (const q of questions) {
    await prisma.question.create({ data: q });
  }

  console.log("Seed done");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());