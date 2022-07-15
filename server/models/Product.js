const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = new Schema({
    username: String,
    price: String,
    imageURL: String,
    name: String
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product;