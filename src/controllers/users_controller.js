//! Custom Modules
const User = require("../models/user_model");

module.exports = {
	getCurrentUser: async (req, res) => {
		res.send(req.user);
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
	loginUser: async (req, res) => {
		const { email_or_phone, password } = req.body;
		try {
			const user = await User.findByCredentials(email_or_phone, password);
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
