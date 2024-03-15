const express = require("express");
const UserModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

// Get User Details
userRouter.get("/users", async (req, res) => {
  try {
    let userList = await UserModel.find();
    res.status(200).json({ user: userList });
  } catch (error) {
    res.status(200).json({ message: "No user found!" });
  }
});

// User register route
userRouter.post("/register", async (req, res) => {
  const { name, password, email, phoneNo } = req.body;

  try {
    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user instance
    const newUser = new UserModel({
      name,
      password: hashedPassword,
      email,
      phoneNo,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).json({ message: "New user has been created" });
  } catch (error) {
    // Handle any errors
    res.status(400).json({ error: error.message });
  }
});

// Function to hash the password
async function hashPassword(password) {
  // Generate a salt and hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

// User login route
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const userDb = await UserModel.findOne({ email });

    // If no user is found, respond with a 404 status
    if (!userDb) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare passwords if user is found
    const isPasswordValid = await bcrypt.compare(password, userDb.password);
    if (isPasswordValid) {
      // Generate JWT token
      const token = jwt.sign({ userId: userDb._id }, process.env.JWT_SECRET);
      res.status(200).json({ message: "Login Successful", token });
    } else {
      res.status(401).json({ error: "Wrong credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve all users
userRouter.get("/", async (req, res) => {
  try {
    const userData = await UserModel.find();
    res.status(200).json({ data: userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = userRouter;
