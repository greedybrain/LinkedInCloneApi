//! Custom Modules
const Like = require("../models/like_model");
const Post = require("../models/post_model");

module.exports = {
	getAllLikes: async (req, res) => {
		try {
			const likes = await Like.find()  ;
			return res.status(200).send(likes);
		} catch (error) {
			res.status(400).send(error.message);
		}
	},
	likePost: async (req, res) => {
		const like = new Like({
			post: req.params.post_id,
			user: req.user._id,
		});
		try {
			const post = await Post.findById(req.params.post_id);
			if (!post) return res.status(404).send("Couldn't find post with that ID");
			await like.populate("user post").execPopulate();
			await like.save();
			post.likes.push(like);
			await post.save();
			return res.status(201).send(like);
		} catch (error) {
			res.status(400).send(error.message);
		}
	},
	unlikePost: async (req, res) => {
		try {
			const like = await Like.findOneAndRemove({
				post: req.params.post_id,
				user: req.user._id,
			});
			if (!like) return res.status(404).send();
			const post = await Post.findById(req.params.post_id);
			if (!post) return res.status(404).send("Couldn't find post with that ID");
			post.likes.id(like._id).remove();
			await post.save();
			return res
				.status(200)
				.send({ like, message: `Post unliked by ${req.user.name}` });
		} catch (error) {
			res.status(400).send(error.message);
		}
	},
};
