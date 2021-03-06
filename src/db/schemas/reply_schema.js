//! NPM Modules
const { Schema } = require("mongoose");

//! Custom Modules
const ResponseSchema = require("./response_schema");

//! Schema definition
const ReplySchema = new Schema(
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
		responses: {
			type: [ResponseSchema],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = ReplySchema;
