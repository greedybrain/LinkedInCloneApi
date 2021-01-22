//! NPM Modules
const mongoose = require("mongoose");

//! Custom Modules
const LikeSchema = require("../db/schemas/like_schema");

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;
