const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    title: String,
    year: String,
    description: String

})

module.exports = mongoose.model("Names",movieSchema)