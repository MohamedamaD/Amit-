const router = require("express").Router();
const { login, register } = require("../controllers/auth.controller");



router.post("/login", login) // /auth/login
router.post("/register", register) // /auth/register


module.exports = router;
