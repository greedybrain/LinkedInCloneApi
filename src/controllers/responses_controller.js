//! Custom Modules
const Response = require('../models/response_model')
const Reply = require("../models/reply_model");
const Post = require("../models/post_model");
const Comment = require('../models/comment_model')

module.exports = {
	getAllResponses: async (req, res) => {
		try {
			const responses = await Response.find();
			return res.status(200).send(responses);
		} catch (error) {
			res.status(400).send(error.message);
		}
	},
	createReplyResponse: async (req, res) => {
		const response = new Response({
			user: req.user._id,
			post: req.params.post_id,
			comment: req.params.comment_id,
			content: req.body.content,
		});

		try {
			const post = await Post.findById(req.params.post_id);
			if (!post) return res.status(404).send("Couldn't find post with that ID");

			const comment = post.comments.id(req.params.comment_id);

			await reply.populate("user comment").execPopulate();
			await reply.save();
			comment.replies.push(reply);
			await post.save();
			return res.status(201).send(reply);
		} catch (error) {
			res.status(400).send(error.message);
		}
	},
	deleteCommentReply: async (req, res) => {
		try {
			const reply = await Reply.findOne({
				_id: req.params.reply_id,
				user: req.user._id,
				comment: req.params.comment_id,
				post: req.params.post_id,
			});
			if (!reply)
				return res.status(404).send("Couldn't find reply with that id");
			console.log("REPLY", reply);
			const post = await Post.findById(req.params.post_id);
			console.log("POST", post);
			if (!post) return res.status(404).send("Couldn't find post with that ID");
			const comment = post.comments.id(req.params.comment_id);
			console.log("COMMENT", comment);
			comment.replies.id(reply._id).remove();
			await post.save();
			return res
				.status(200)
				.send({ comment, message: `Reply deleted by ${req.user.name}` });
		} catch (error) {
			res.status(400).send(error.message);
		}
	},
};
