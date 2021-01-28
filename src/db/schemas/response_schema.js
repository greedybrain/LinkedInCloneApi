//! NPM Modules
const { Schema } = require("mongoose");

//! Custom Modules
// const ReplySchema = require("./reply_schema")

//! Schema definition
const ResponseSchema = new Schema(
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
			ref: "User",
		},
		comment: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "Comment",
		},
		reply: {
			type: Schema.Types.ObjectId,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = ResponseSchema;
