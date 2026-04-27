const express = require("express");
const app = express();

const prisma = require("./lib/prisma");
const questionRoutes = require("./routes/questions");
const authRouter = require("./routes/auth");

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/questions", questionRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ msg: "Not found" });
});

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});