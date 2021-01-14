//! NPM Modules
const jwt = require("jsonwebtoken");

//! Custom Modules
const User = require("../models/user_model");

const ifAuthorized = async (req, res, next) => {
	try {
		const tokenValue = req.header("Authorization").replace("Bearer ", "");
		const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
		const user = await User.findOne({
			_id: decoded._id,
			"tokens.tokenValue": tokenValue,
		});

		if (!user) throw new Error();

		req.tokenValue = tokenValue;
		req.user = user;
		next();
	} catch (error) {
		res.status(401).send({ error: "Please authenticate" });
	}
};

module.exports = ifAuthorized;
