const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    username: String,
    comment: String,
    time: String,
    productId: String,
    verified: Boolean
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment;