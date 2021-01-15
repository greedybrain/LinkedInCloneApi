//! NPM Modules
const express = require("express");
const router = express.Router();

//! Custom Modules
const {
	createUser,
	loginUser,
	logoutUser,
	logoutAllSessions,
	getCurrentUser,
	getAllUsers,
} = require("../controllers/users_controller");
const ifAuthorized = require("../middleware/auth");

//! Routes definition
router.get("/", getAllUsers);
router.get("/me", ifAuthorized, getCurrentUser);
router.post("/", createUser); // signup
router.post("/login", loginUser); // login
router.post("/logout", ifAuthorized, logoutUser); // logout
router.post("/logout/all", ifAuthorized, logoutAllSessions); // logout all sessions

//! Export
module.exports = router;
