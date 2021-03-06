const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = new Schema({
    username: String,
    price: String,
    imageURL: String,
    name: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    size: String,
    category: {
        type: String,
        enum: ['pants', 'accessories', 'outerwear', 'shoes', 'shirts', 'other']
    },
    tags: Array
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product;