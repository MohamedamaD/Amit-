const {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
  findUserPosts,
} = require("../controllers/user.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.get("/", getAllUsers);
router.get("/posts", authMiddleware, findUserPosts); // /users/posts

router.get("/:id", getUserById); // /users/:id
router.post("", createUser);
router.put("/:id", updateUser);
router.delete(
  "/:id",
  authMiddleware, // req.user
  (req, res) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "You are not authorized to delete this user",
      });
    }
    next();
  },
  deleteUser
);



module.exports = router;
