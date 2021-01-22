//! NPM Modules
const { Schema } = require("mongoose");

//! Schema definition
const LikeSchema = new Schema(
	{
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

module.exports = LikeSchema ;
