const express = require("express");
const BlogModel = require("../model/blogModel");

const blogRouter = express.Router();

blogRouter.get("/", async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(200).json({ message: error });
  }
});

blogRouter.post("/createBlog", async (req, res) => {
  try {
    const { title, author } = req.body; // Corrected from res.body to req.body
    const blog = new BlogModel({
      title,
      author,
    });

    const newBlog = await blog.save();
    res
      .status(201)
      .json({ message: "New blog has been created :)", data: newBlog });
  } catch (error) {
    res.status(200).json({ message: [] });
  }
});

module.exports = blogRouter;
