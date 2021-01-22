//! NPM Modules
const { Schema } = require("mongoose");

//! Custom Modules
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
	},
	{
		timestamps: true,
	}
);

module.exports = PostSchema;
