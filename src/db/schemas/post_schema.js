//! NPM Modules
const { Schema } = require("mongoose");

//! Custom Modules
const CommentSchema = require("./comment_schema");
const LikeSchema = require("./like_schema");

//! Schema definition
const PostSchema = new Schema(
	{
		content: {
			type: String,
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		likes: {
			type: [LikeSchema],
		},
		comments: {
			type: [CommentSchema],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = PostSchema;
