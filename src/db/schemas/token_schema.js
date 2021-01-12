//! NPM Modules
const { Schema } = require("mongoose");

//! Schema definition
const TokenSchema = new Schema(
	{
		tokenValue: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = TokenSchema;
