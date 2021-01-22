//! NPM Modules
const express = require("express");
const router = express.Router();

//! Custom Modules
const {
	likePost,
	unlikePost,
	getAllLikes,
} = require("../controllers/likes_controller");
const ifAuthorized = require("../middleware/auth");

//! Routes definition
router.get("/", ifAuthorized, getAllLikes);
router.post("/:post_id", ifAuthorized, likePost);
router.delete("/:post_id", ifAuthorized, unlikePost);

//! Export
module.exports = router;
