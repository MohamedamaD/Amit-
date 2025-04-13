const Post = require("../model/posts.model");
const User = require("../model/user.model");
const PostSchema = require("../validators/post.validator");

const createPost = async (req, res) => {
  try {
    const { error, value } = await PostSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const user_id = req.user.id;
    const post = new Post({ ...req.body, owner: user_id });
    await post.save();

    await User.findByIdAndUpdate(user_id, {
      $push: { posts: post._id },
    });

    res.status(201).json({ data: post, message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ data: post, message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// just for testing purposes
// const findAllProducts = async (req, res) => {
//   const { minPrice, maxPrice } = req.query;
//   const products = await Product.find({
//     price: { $gte: minPrice, $lte: maxPrice },
//   });
// };

const findAll = async (req, res) => {
  try {
    const posts = await Post.find().populate("owner", "name email");
    res.json({ data: posts, message: "Posts fetched successfully" });
  } catch (error) {
    res.states(500).json({ message: error.message });
  }
};
const findOneById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ data: post, message: "Post fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (post) {
      await User.findByIdAndUpdate(post.owner, {
        $pull: { posts: post._id },
      });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  updatePost,
  findAll,
  findOneById,
  deletePost,
};
