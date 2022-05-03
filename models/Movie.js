const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    name: String,
    title: String,
    year: String,
    // genres: Array,
    // ratings: Array
})

module.exports = mongoose.model("Movie",movieSchema)

