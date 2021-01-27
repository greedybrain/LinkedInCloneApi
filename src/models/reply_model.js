//! NPM Modules
const mongoose = require("mongoose");

//! Custom Modules
const ReplySchema = require("../db/schemas/reply_schema");

const Reply = mongoose.model("Reply", ReplySchema);

module.exports = Reply;
