const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    title: String,
    year: String,
    description: String

})

module.exports = mongoose.model("list",itemSchema)