//! NPM Modules
const mongoose = require("mongoose");

//! Custom vars
const chalk = require("chalk");
const error = chalk.bold.redBright.inverse;
const success = chalk.bold.greenBright.inverse;
const { log } = console;

//! DB definition

const startDB = async () => {
	const MONGO_URI_USER = process.env.MONGO_URI_USER;
	const MONGO_URI_SECRET = process.env.MONGO_URI_SECRET;
	const CONNECTION_URL = `mongodb+srv://${MONGO_URI_USER}:${MONGO_URI_SECRET}@linked-in-clone.gqpwr.mongodb.net`;
	try {
		await mongoose.connect(CONNECTION_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});
		log(success("Connected to database"));
	} catch (err) {
		log(error(err));
	}
};
startDB();
