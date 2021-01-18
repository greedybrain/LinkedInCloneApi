//! Custom Modules
const Post = require("../models/post_model");

module.exports = {
	getAllPosts: async (req, res) => {
		try {
			const posts = await Post.find().populate("user").exec();
			console.log(posts);
			res.status(200).send(posts);
		} catch (error) {
			res.status(400).send(error.message);
		}
	},
	createPost: async (req, res) => {
		const post = new Post({
			...req.body,
			user: req.user._id,
		});
		try {
			await post.populate("user").execPopulate();
			await post.save();
			return res.status(201).send(post);
		} catch (error) {
			res.status(400).send(error.message);
		}
	},
	updatePost: async (req, res) => {
		const updates = Object.keys(req.body);
		const allowedUpdates = ["content"];
		const isValidOperation = updates.every((update) =>
			allowedUpdates.includes(update)
		);

		if (!isValidOperation) return res.status(400).send("Invalid Updates");

		try {
			const post = await Post.findOne({
				_id: req.params.post_id,
				user: req.user._id,
			});
			if (!post) return res.status(404).send();

			updates.forEach((update) => (post[update] = req.body[update]));
			await post.save();
			return res.status(200).send(post);
		} catch (error) {
			res.status(400).send(error.message);
		}
	},
	deletePost: async (req, res) => {
		try {
			const post = await Post.findOneAndRemove({
				_id: req.params.id,
				user: req.user._id,
			});
			if (!post) return res.status(404).send();
			return res.status(200).send(post);
		} catch (error) {
			res.status(400).send(error.message);
		}
	},
};
