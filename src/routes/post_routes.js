//! NPM Modules
const express = require("express");
const router = express.Router();

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
router.post("/:post_id", ifAuthorized, updatePost);
router.delete("/:post_id", ifAuthorized, deletePost);

//! Export
module.exports = router;
