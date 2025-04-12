const {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
} = require("../controllers/user.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
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
