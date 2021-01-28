//! NPM Modules
const { Schema } = require("mongoose");

//! Custom Modules
const CommentSchema = require("./comment_schema");
const LikeSchema = require("./like_schema");

//! Schema definition
const NotificationSchema = new Schema(
	{
		notifType: {
			type: String,
		},
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		post: {
			type: Schema.Types.ObjectId,
			ref: "Post",
		},
		comment: {
			type: Schema.Types.ObjectId,
			ref: "Comment",
                },
                reply: {
                        type: Schema.Types.ObjectId,
                        ref: "Reply"
                }
	},
	{
		timestamps: true,
	}
);

module.exports = NotificationSchema;
