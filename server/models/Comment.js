const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    username: String,
    content: String
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment;