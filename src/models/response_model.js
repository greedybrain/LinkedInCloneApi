//! NPM Modules
const mongoose = require("mongoose");

//! Custom Modules
const ResponseSchema = require("../db/schemas/response_schema");

const Response = mongoose.model("Response", ResponseSchema);

module.exports = Response;
