const {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
  findUserPosts,
} = require("../controllers/user.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const RoleMiddleWare = require("../middlewares/role.middleware");
const Role = require("../utils/role");

const router = require("express").Router();

router.get("/", getAllUsers);
router.get("/posts", authMiddleware, findUserPosts); // /users/posts

router.get("/:id", getUserById); // /users/:id
router.post("", createUser);
router.put("/:id", updateUser);
router.delete(
  "/:id",
  authMiddleware, // req.user
  RoleMiddleWare(Role.ADMIN),
  deleteUser
);




// SQL Routes




module.exports = router;
