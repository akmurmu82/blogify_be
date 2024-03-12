const express = require("express");
const BlogModel = require("../model/blogModel");
const UserModel = require("../model/userModel");
const bcrypt = require("bcrypt");

const blogRouter = express.Router();
// Guest register route
blogRouter.post("/register", async (req, res) => {
  const { name,  email, phoneNo } = req.body;

  try {
    // Create a new guest instance
    const newUser = new UserModel({
      name,
      email,
      phoneNo,
      
    });

    // Save the new guest to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).json({ message: "New User Has Registered" });
  } catch (error) {
    // Handle any errors
    console.error("Error registering User:", error);
    res.status(500).json({ message: "Failed to register User" });
  }
});

// Login route
blogRouter.post("/login", async (req, res) => {
  const { email, phoneNo, password } = req.body;

  try {
    // Find the user by email
    const userDb = await UserModel.findOne({ email });

    // If no user is found, respond with a 404 status
    if (!userDb) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords if user is found
    bcrypt.compare(password, userDb.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ foo: "gaf" }, "gaf");
        res.status(200).json({ message: "Login Successful", token: token });
      } else {
        res.status(401).json({ message: "Wrong credentials" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

blogRouter.get("/", async (req, res) => {
  try {
    const blogData = await BlogModel.find();
    res.status(200).json({ data: blogData });
  } catch (error) {
    res.status(404).json({ message: "No blogs found!" });
  }
});

blogRouter.post("/createBlog", async (req, res) => {
  try {
    const { title, author, content, imgSrc } = req.body; // Corrected from res.body to req.body
    const blog = new BlogModel({
      title,
      author,
      content,
      imgSrc,
    });

    const newBlog = await blog.save();
    res.status(201).json({ message: "New blog has been created :)", data: newBlog });
  } catch (error) {
    res
      .status(200)
      .json({ message: [] });
  }
});

module.exports = { blogRouter };
