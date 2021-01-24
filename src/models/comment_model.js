//! NPM Modules
const mongoose = require("mongoose");

//! Custom Modules
const CommentSchema = require("../db/schemas/comment_schema");

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
