const { Schema, model } = require('mongoose')

var schema = Schema({
    title: String,
    intro: String,
    content: String,
    url: String,
    author: String,
    date: { type: Date, default: Date.now },
    image: String,
    idCloud: String
})


module.exports = {
    model
}