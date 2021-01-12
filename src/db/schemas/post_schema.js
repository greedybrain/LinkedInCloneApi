//! NPM Modules
const { Schema } = require("mongoose");

//! Schema definition
const PostSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		image_url: {
			type: String,
			required: true,
			trim: true,
		},
		vendor_name: {
			type: String,
			required: true,
			trim: true,
		},
		location: {
			type: String,
			required: true,
			trim: true,
		},
		forks: {
			type: Number,
		},
		review: {
			type: String,
			trim: true,
		},
		eng_score: {
			type: Number,
		},
		categories: {
			type: [String],
		},
		keywords: {
			type: [String],
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
