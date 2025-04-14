const Post = require("../model/posts.model");
const Comment = require("../model/comments.model");
const createComment = async (req, res) => {
  const { post_id } = req.params;
  const { text } = req.body;
  const userId = req.user.id;

  try {
    const comment = await Comment.create({ text, author: userId });
    const post = await Post.findByIdAndUpdate(post_id, {
      $push: { comments: comment._id },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(201).json({ message: "Comment created successfully", comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createComment,
};
