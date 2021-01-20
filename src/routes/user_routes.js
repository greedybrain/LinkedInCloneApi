//! NPM Modules
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({
	limits: {
		fileSize: 2000000,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)/))
			return cb(new Error("Please upload a valid image"));

		cb(undefined, true);
	},
	storage: multer.memoryStorage(),
});

//! Custom Modules
const {
	createUser,
	uploadAvatar,
	getAvatar,
	loginUser,
	logoutUser,
	logoutAllSessions,
	getCurrentUser,
	getAllUsers,
	removeAvatar,
} = require("../controllers/users_controller");
const ifAuthorized = require("../middleware/auth");

//! Routes definition
router.get("/", getAllUsers);
router.get("/me", ifAuthorized, getCurrentUser);
router.post("/", createUser); // signup
router.post(
	"/me/avatar",
	ifAuthorized,
	upload.single("avatar"),
	async (req, res) => {
		try {
			req.user.avatar = req.file.buffer;
			await req.user.save();
			console.log(req.user.avatar);
			return res.status(201).send(req.user.avatar);
		} catch (error) {
			console.log(error.message);
		}
	}
);
router.get("/:id/avatar", getAvatar);
router.delete("/me/avatar", ifAuthorized, removeAvatar);
router.post("/login", loginUser); // login
router.post("/logout", ifAuthorized, logoutUser); // logout
router.post("/logout/all", ifAuthorized, logoutAllSessions); // logout all sessions

//! Export
module.exports = router;
