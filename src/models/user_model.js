//! NPM Modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//! Custom Modules
const UserSchema = require("../db/schemas/user_schema");

UserSchema.virtual("posts", {
	ref: "Post",
	localField: "_id",
	foreignField: "user",
});

UserSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;

	return userObject;
};

UserSchema.methods.generateAuthToken = async function () {
	const user = this;
	const tokenValue = jwt.sign(
		{ _id: user._id.toString() },
		process.env.JWT_SECRET
	);
	user.tokens = user.tokens.concat({ tokenValue });

	await user.save();
	return tokenValue;
};

UserSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });
	const isMatch = await bcrypt.compare(password, user.password);
	if (!user || !isMatch) throw new Error("Check email or password");
	return user;
};

UserSchema.pre("save", async function (next) {
	const user = this;

	if (user.isModified("password"))
		user.password = await bcrypt.hash(user.password, 8);

	next();
});

//! Model definition
const User = mongoose.model("User", UserSchema);

module.exports = User;
