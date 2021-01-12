//! NPM Modules
const mongoose = require("mongoose");

//! Custom Modules
const PostSchema = require("../db/schemas/post_schema");

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
