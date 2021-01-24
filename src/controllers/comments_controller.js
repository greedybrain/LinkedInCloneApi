//! Custom Modules
const Comment = require("../models/comment_model");
const Post = require("../models/post_model");

module.exports = {
	getAllComments: async (req, res) => {
		try {
			const comments = await Comment.find();
			return res.status(200).send(comments);
		} catch (error) {
			res.status(400).send(error.message);
		}
	},
	createPostComment: async (req, res) => {
		const comment = new Comment({
			user: req.user._id,
			post: req.params.post_id,
			content: req.body.content,
		});
		try {
			const post = await Post.findById(req.params.post_id);
			if (!post) return res.status(404).send("Couldn't find post with that ID");
			await comment.populate("user post").execPopulate();
			await comment.save();
			post.comments.push(comment);
			await post.save();
			return res.status(201).send(comment);
		} catch (error) {
			res.status(400).send(error.message);
		}
	},
	deletePostComment: async (req, res) => {
		try {
			const comment = await Comment.findOneAndRemove({
				user: req.user._id,
				post: req.params.post_id,
			});
			if (!comment)
				return res.status(404).send("Couldn't find comment with that id");
			const post = await Post.findById(req.params.post_id);
			if (!post) return res.status(404).send("Couldn't find post with that ID");
			post.comments.id(comment._id).remove();
			await post.save();
			return res
				.status(200)
				.send({ comment, message: `Comment deleted by ${req.user.name}` });
		} catch (error) {
			res.status(400).send(error.message);
		}
	},
};
