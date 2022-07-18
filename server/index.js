const catchAsync = require('./utils/catchAsync');
const express = require('express');
const app = express();
const axios = require('axios');
const User = require('./models/User')
const Product = require('./models/Product')
const Comment = require('./models/Comment')

const dotenv = require('dotenv');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const corsOptions = {
    credentials: true,
    optionSuccessStatus: 200
}

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Mongo connection open')

    })
    .catch(err => {
        console.log("oh no, Mongo error", err)
    })

app.use(cors(corsOptions));
app.use(express.json());

app.listen(3001, () => {
    console.log('Server listening on port 3001')
})


app.post('/', (req, res) => {
    res.json({ message: 'This connection works' })
})

app.post('/signUp', catchAsync(async (req, res) => {
    const { localId, username } = req.body;
    const newUser = new User({ localId: localId, username: username, products: [] })
    newUser.save();
}))

app.post('/userInfo', catchAsync(async (req, res) => {
    const { localId } = req.body;
    const currentUser = await User.findOne({ localId: localId })
    res.json({ username: currentUser.username, verified: currentUser.verified })
}))

app.post('/uploadProduct', catchAsync(async (req, res) => {
    const { username, product, imageURL, price, tags, size, category } = req.body;
    const tagsArray = tags.split(' ')
    const newProduct = new Product({ username: username, name: product, imageURL: imageURL, price: price, tags: tagsArray, size: size, category: category });
    await newProduct.save();
    const currentUser = await User.findOne({ username: username })
    currentUser.products.push(newProduct);
    currentUser.save();

}))

app.post('/findByUser', catchAsync(async (req, res) => {
    const { username } = req.body;
    const foundUser = await User.findOne({ username: username })
    res.json({ foundUser })
}))

app.post('/getUserProducts', catchAsync(async (req, res) => {
    const { totalProducts } = req.body;
    let productArray = []
    console.log(productArray)
    for (let product of totalProducts) {
        const thisProduct = await Product.findById(product)
        const p = { imageURL: thisProduct.imageURL, price: thisProduct.price, name: thisProduct.name, id: thisProduct._id, tags: thisProduct.tags, category: thisProduct.category, size: thisProduct.size }
        productArray.push(p)

    }
    res.json(productArray)
}))

app.post('/getProduct', catchAsync(async (req, res) => {
    const { id } = req.body;
    console.log(id)
    const product = await Product.findById(id);
    res.json(product)
}))

app.post('/postComment', catchAsync(async (req, res) => {
    const { username, comment, time, productId, verified } = req.body;
    console.log(productId)
    const newComment = new Comment({ username: username, comment: comment, time: time, productId: productId, verified: verified })
    await newComment.save();
    const currentProduct = await Product.findById(productId);
    currentProduct.comments.push(newComment);
    await currentProduct.save();
    res.json({ message: 'Post success' })
}))

app.post('/getComment', catchAsync(async (req, res) => {
    const { comments } = req.body;
    const commentsArray = [];
    for (let comment of comments) {
        let thisComment = await Comment.findById(comment)
        commentsArray.push(thisComment)
    }
    res.json(commentsArray)
}))

app.post('/latestProducts', async (req, res) => {
    const { productCounter = 20 } = req.body;
    console.log(productCounter)
    const products = await Product.find({})
    const splicedProducts = products.reverse().splice(0, productCounter)
    console.log(splicedProducts)
    res.json(splicedProducts)
})

app.post('/filterProducts', catchAsync(async (req, res) => {
    const { query } = req.body;
    console.log(req.query)
    const nameRegex = new RegExp(query);
    const filtered = await Product.find({ $or: [{ name: { $regex: nameRegex, $options: 'i' } }, { tags: { $regex: nameRegex, $options: 'i' } }] })
    res.json(filtered)



}))