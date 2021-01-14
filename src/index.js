//! NPM Modules
// init express app
const cors = require("cors");
const express = require("express");
const app = express();

//! Custom Modules
require("dotenv").config(); // startup / set configurations
require("./db/db_setup");
const userRouter = require("./routes/user_routes");

//! Custom vars
const chalk = require("chalk");
const error = chalk.bold.redBright.inverse;
const success = chalk.bold.greenBright.inverse;

//! Middleware definition
app.use(express.json());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header("Access-Control-Allow-Headers", "*");
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
		return res.status(200).json({});
	}
	next();
});

//! Mounting Routers
app.use("/users", userRouter);

//! Listening
const PORT = process.env.PORT || 5000;
const { log } = console;

app.listen(PORT, (err) =>
	err ? log(error(err)) : log(success(`Listening on PORT > ${PORT}`))
);
