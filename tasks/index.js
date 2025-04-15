// 🔐 Auth & Authorization Tasks

const Post = require("../model/posts.model");
const { findByIdAndUpdate } = require("../model/posts.model");

// ✅ Task: Return the currently logged-in user's info
async function getCurrentUser(req, res) {
  const user_id = req.user.id;
  try {
    const user = await User.findByPk(user_id);
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ✅ Task: Middleware to restrict access by role (e.g., Admin only)
// hint : what is type of this function? and what will it return?
function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: error.message });
    }
    next();
  };
}

// 🧩 Mongoose Relations Tasks

// ✅ Task: Fetch all posts and populate user info
async function getAllPosts(req, res) {
  try {
    const posts = await Post.find().populate("owner");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ✅ Task: Add a comment to a post (reference user & post)
async function addComment(req, res) {
  const { post_id } = req.params;
  const { text } = req.body;

  try {
    const comment = await Comment.create({ text, author: user_id });
    const post = await Post.findByIdAndUpdate(post_id, {
      $push: { comments: comment },
    });
    res.status(201).json({ message: "Comment created successfully", comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// 🖼️ File Upload Task

// ✅ Task: Upload and save user profile image
async function updateProfilePicture(req, res) {
  const user_id = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(user_id, {
      img: req.files.filename,
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// 🧱 Model & Association Tasks SqL

// ✅ Task: Create a User with Sequelize
async function createUser(req, res) {
  const data = req.body;
  try {
    const user = await User.create(data);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ✅ Task: Create a Post model and relate it to User (One-to-Many)
async function createPost(req, res) {
  const data = req.body;
  const user_id = req.user.id;
  try {
    const user = await User.findByPK(user_id);
    const post = await user.createPost(data);
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ✅ Task: Get all posts with the author's (user) data included
function getAllPostsWithUsers(req, res) {
  // method 1
  Post.findAll({ include: "user" });
  // method 2
  Post.getUsers();
  User.getPosts();
}

// ✅ Task: Get a single user and include all their posts
async function getUserWithPosts(req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    const posts = await user.getPosts();
    res.json({ user, posts });
  } catch {
    res.status(500).json({ message: error.message });
  }
}
// ✅ Task: Update a post's title/content
async function updatePost(req, res) {
  try {
    const ret = await Post.update(req.body, { where: { id: req.params.id } });
    res.json(ret);
  } catch (error) {
    res.status(500).send("internal server error:" + error.message);
  }
}

// ✅ Task: Delete a post by ID
async function deletePost(req, res) {
  try {
    const ret = await Post.destroy({ where: { id: req.params.id } });
    res.json(ret);
  } catch (error) {
    res.status(500).send("internal server error:" + error.message);
  }
}
