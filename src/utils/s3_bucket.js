//! Core Modules
const fs = require("fs");
const path = require("path");

//! NPM Modules
const AWS = require("aws-sdk");

AWS.config.update({
	accessKeyId: process.env.S3_ACCESS_KEY_ID,
	secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();
const filePath = path.join(__dirname, "../data/images/random_img.png");

const params = {
	Bucket: "linkedin-clone-bucket",
	Body: fs.createReadStream(filePath),
	Key: `folder/${Date.now()}_${path.basename(filePath)}`,
};

s3.upload(params, (err, data) => {
	if (err) return console.log("Error", err);
	console.log("Uploaded in: ", data.Location);
});
