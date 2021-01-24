//! NPM Modules
const { Schema } = require("mongoose");

//! Schema definition
const CommentSchema = new Schema(
	{
		content: {
			type: String,
			required: true,
			trim: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		post: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "Post",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = CommentSchema;
