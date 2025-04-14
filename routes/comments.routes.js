const { createComment } = require("../controllers/comments.controllers");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.post("/:post_id", authMiddleware, createComment);

module.exports = router;
