const router = require("express").Router();
const {
  createPost,
  findAll,
  findOneById,
  updatePost,
  deletePost,
} = require("../controllers/posts.controller.js");
const { authMiddleware } = require("../middlewares/auth.middleware.js");
const {
  tryCatchWrapper,
} = require("../middlewares/error-handler.middleware.js");
const uploads = require("../middlewares/uploads.middleware.js");

router.get("/", tryCatchWrapper(findAll));
router.get("/:id", findOneById);
router.post("", authMiddleware, uploads.single("file"), createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
// router.get("/:id/comments", getPostsWithComment); TODO : Task
module.exports = router;
