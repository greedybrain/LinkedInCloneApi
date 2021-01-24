//! NPM Modules
const express = require("express");
const router = express.Router();

//! Custom Modules
const {
	createPostComment,
	deletePostComment,
	getAllComments,
} = require("../controllers/comments_controller");
const ifAuthorized = require("../middleware/auth");

//! Routes definition
router.get("/", ifAuthorized, getAllComments);
router.post("/:post_id", ifAuthorized, createPostComment);
router.delete("/:post_id", ifAuthorized, deletePostComment);

//! Export
module.exports = router;
