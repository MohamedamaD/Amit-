const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  img: { type: String, required: false, default: "" },

  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],

  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
