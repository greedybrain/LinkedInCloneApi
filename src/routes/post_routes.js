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
});

//! Custom Modules
const {
	getAllPosts,
	createPost,
	updatePost,
	deletePost,
} = require("../controllers/posts_controller");
const ifAuthorized = require("../middleware/auth");

//! Routes definition
router.get("/", ifAuthorized, getAllPosts);
router.post("/", ifAuthorized, createPost);
router.post("/image/upload", ifAuthorized, upload.single("post_image"));
router.patch("/:post_id", ifAuthorized, updatePost);
router.delete("/:post_id", ifAuthorized, deletePost);

//! Export
module.exports = router;
