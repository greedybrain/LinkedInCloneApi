//! NPM Modules
const { Schema } = require("mongoose");
const validator = require("validator");

//! Custom Modules
const TokenSchema = require("../schemas/token_schema");

//! Schema definition
const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			unique: true,
			validate(value) {
				if (!validator.isEmail(value)) throw new Error("Invalid Email");
			},
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minlength: 8,
			validate(value) {
				if (value.toLowerCase().includes("password"))
					throw new Error(
						"Password is invalid, password cannot contain the word password"
					);
			},
		},
		headline: {
			type: String,
			required: true,
		},
		tokens: {
			type: [TokenSchema],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = UserSchema;
