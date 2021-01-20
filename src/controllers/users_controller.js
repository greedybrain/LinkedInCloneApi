//! Custom Modules
const User = require("../models/user_model");

module.exports = {
	getAllUsers: async (req, res) => {
		try {
			const users = await User.find();
			res.status(200).send(users);
		} catch (error) {
			res.status(400).send(error.message);
		}
	},
	getCurrentUser: async (req, res) => {
		const { user: data } = req;
		const { posts } = data;
		res.send({ data, posts });
	},
	createUser: async (req, res) => {
		const user = new User(req.body);
		try {
			await user.save();
			const tokenValue = await user.generateAuthToken();
			return res.status(201).send({ user, tokenValue });
		} catch (error) {
			res.status(400).send(error.message);
		}
	},
	uploadAvatar: async (req, res) => {
		try {
			req.user.avatar = req.file.buffer;
			await req.user.save();
			console.log(req.user.avatar);
			return res.status(201).send(req.user.avatar);
		} catch (error) {
			console.log(error.message);
		}
	},
	getAvatar: async (req, res) => {
		try {
			const user = await User.findById(req.params.id);
			if (!user || !user.avatar) throw new Error();

			res.header("Content-Type", "image/jpg");
			res.status(200).send(user.avatar);
		} catch (error) {
			res.status(404).send(error.message);
		}
	},
	removeAvatar: async (req, res) => {
		req.user.avatar = undefined;
		try {
			await req.user.save();
			res.send();
		} catch (error) {
			console.log(error.message);
		}
	},
	loginUser: async (req, res) => {
		const { email, password } = req.body;
		try {
			const user = await User.findByCredentials(email, password);
			const tokenValue = await user.generateAuthToken();
			return res.status(200).send({ user, tokenValue });
		} catch (error) {
			res.status(400).send(error.message);
		}
	},
	logoutUser: async (req, res) => {
		const { user } = req;
		try {
			user.tokens = user.tokens.filter(
				(token) => token.tokenValue !== req.tokenValue
			);
			await user.save();
			return res.status(200).send({ user, message: "Logged Out" });
		} catch (error) {
			res.status(500).send(error.message);
		}
	},
	logoutAllSessions: async (req, res) => {
		const { user } = req;
		try {
			user.tokens = [];
			await user.save();
			return res.status(200).send({ message: "Logged out of all sessions" });
		} catch (error) {
			res.status(500).send(error.message);
		}
	},
};
