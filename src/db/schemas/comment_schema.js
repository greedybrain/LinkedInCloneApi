//! NPM Modules
const { Schema } = require("mongoose");

//! Custom Modules
const ReplySchema = require('./reply_schema')

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
		replies: {
			type: [ReplySchema]
		}
	},
	{
		timestamps: true,
	}
);

module.exports = CommentSchema;
