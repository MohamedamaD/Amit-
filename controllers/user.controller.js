const Post = require("../model/posts.model");
const User = require("../model/user.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.json({ data: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const newUser = await User.findByIdAndUpdate(id, body, { new: true });
    return res.json({ data: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    return res.json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const findUserPosts = async (req, res) => {
  try {
    const user_id = req.user.id;
    // const posts = await Post.find({ user_id });
    const user = await User.findById(user_id).populate("posts");
    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  createUser,
  getUserById,
  findUserPosts,
};
