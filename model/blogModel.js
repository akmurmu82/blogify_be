const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  author: { type: String, require: true },
  title: { type: String, require: true },
//   publication_date: { type: String, require: true },
//   content: { type: String, require: true },
//   imgSrc: { type: String, require: true },
//   likes: { type: Number, require: true },
//   comment: { type: Array, require: true },
//   share: { type: Number, require: true },
});

const BlogModel = mongoose.model("blog", blogSchema);

module.exports = BlogModel;
