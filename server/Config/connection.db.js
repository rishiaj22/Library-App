const mongoose = require("mongoose");

const connection = mongoose.connect(process.env.MongoURl)

module.exports = connection