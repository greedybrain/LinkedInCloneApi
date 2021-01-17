//! NPM Modules
const { Schema } = require("mongoose");

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
	},
	{
		timestamps: true,
	}
);

module.exports = PostSchema;
