//! NPM Modules
const express = require("express");
const router = express.Router();

//! Custom Modules
const {
	getAllReplies,
	createCommentReply,
	deleteCommentReply,
} = require("../controllers/replies_controller");
const ifAuthorized = require("../middleware/auth");

//! Routes definition
router.get("/", ifAuthorized, getAllReplies);
router.post("/:comment_id/post/:post_id", ifAuthorized, createCommentReply);
router.delete("/:reply_id/comment/:comment_id/post/:post_id", ifAuthorized, deleteCommentReply);

//! ExportCr
module.exports = router;
