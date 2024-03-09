const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  publication_date: { type: Date, default: Date.now },
  content: { type: String, required: true },
  imgSrc: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [{ type: String }], // Example array of comments
  shares: { type: Number, default: 0 },
});

const BlogModel = mongoose.model("Blog", blogSchema);

module.exports = BlogModel;
