const express = require("express");
const BlogModel = require("../model/blogModel");

const blogRouter = express.Router();

blogRouter.get("/", async (req, res) => {
  try {
    const { email } = req.body; // Corrected from res.body to req.body
    const blog = new BlogModel.findOne({ email });

    res.status(201).json({ data: blog });
  } catch (error) {
    res.status(200).json({ message: "Blogs not found!" });
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
    res
      .status(201)
      .json({ message: "New blog has been created :)", data: newBlog });
  } catch (error) {
    res.status(200).json({ message: [] });
  }
});

module.exports = blogRouter;
