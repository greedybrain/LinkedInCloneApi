//! NPM Modules
const express = require("express");
const router = express.Router();

//! Custom Modules
const {
	createUser,
	loginUser,
	logoutUser,
	logoutAllSessions,
} = require("../controllers/users_controller");
const ifAuthorized = require("../middleware/auth.js");

//! Routes definition
router.post("/", createUser); // signup
router.post("/login", loginUser); // login
router.post("/logout", ifAuthorized, logoutUser); // logout
router.post("/logout/all", ifAuthorized, logoutAllSessions); // logout all sessions

//! Export
module.exports = router;
