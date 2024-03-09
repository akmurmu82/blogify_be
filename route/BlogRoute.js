const express = require("express");
const BlogModel = require("../model/blogModel");


const blogRouter = express.Router();

blogRouter.get("/data", (req, res) => {
  res.send({ message: { data: "Amit" } });
});

blogRouter.post("/createBlog", async (req, res) => {
  try {
    const { title, author } = req.body; // Corrected from res.body to req.body
    const blog = new BlogModel({
      title,
      author,
    });

    await blog.save();
    res.status(201).json({ message: "New blog has been created :)" });
  } catch (error) {
    res
      .status(501)
      .json({ message: "Error while saving the blog. check your fields" });
  }
});

module.exports = { blogRouter };
