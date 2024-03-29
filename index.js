const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connection = require("./db");
const app = express();
const port = process.env.PORT || 3000;

// Importing route handlers
const blogRouter = require("./route/BlogRoute")
const userRouter = require("./route/userRoute");

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());
// Route handlers

app.use("/blog", blogRouter);
app.use("/bloguser", userRouter);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to Homepages" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Starting the server
app.listen(port, async () => {
  try {
    await connection;
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
});
