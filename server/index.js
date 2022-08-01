const catchAsync = require('./utils/catchAsync');
const express = require('express');
const app = express();
const User = require('./models/User')
const Product = require('./models/Product')
const Comment = require('./models/Comment')
const Cart = require('./models/Cart')
const PORT = process.env.PORT || 3001
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

app.listen(PORT, () => {
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
    res.json({ username: currentUser.username, verified: currentUser.verified, cart: currentUser.cart })
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

    for (let product of totalProducts) {
        const thisProduct = await Product.findById(product)
        const p = { imageURL: thisProduct.imageURL, price: thisProduct.price, name: thisProduct.name, id: thisProduct._id, tags: thisProduct.tags, category: thisProduct.category, size: thisProduct.size }
        productArray.push(p)

    }
    res.json(productArray)
}))

app.post('/getProduct', catchAsync(async (req, res) => {
    const { id } = req.body;
    const product = await Product.findById(id);
    res.json(product)
}))

app.post('/postComment', catchAsync(async (req, res) => {
    const { username, comment, time, productId, verified } = req.body;
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
    const products = await Product.find({})
    const splicedProducts = products.reverse().splice(0, productCounter)
    res.json(splicedProducts)
})

app.post('/filterProducts', catchAsync(async (req, res) => {
    const { query } = req.body;
    const nameRegex = new RegExp(query);
    const filtered = await Product.find({ $or: [{ name: { $regex: nameRegex, $options: 'i' } }, { tags: { $regex: nameRegex, $options: 'i' } }] })
    res.json(filtered)

}))

app.post('/addToCart', catchAsync(async (req, res) => {
    const { id, username } = req.body;
    const user = await User.findOne({ username: username });
    const product = await Product.findById(id);
    if (!user.cart) {
        const cart = new Cart({ products: product, quantity: 1 })
        await cart.save();
        user.cart = cart;
        await user.save();
    } else {
        const cart = await Cart.findById(user.cart)
        cart.products.push(id);
        cart.quantity = cart.products.length
        await cart.save();
    }
    res.json({ message: 'Successfully added to cart.' })
}))

app.post('/getCartContents', catchAsync(async (req, res) => {
    const { cartId } = req.body;
    const thisCart = await Cart.findById(cartId)
    res.json(thisCart)
}))

app.post('/getMultipleProducts', catchAsync(async (req, res) => {
    const { cartProductIds } = req.body
    let allProductData = [];

    for (let productId of cartProductIds) {
        const product = await Product.findById(productId)
        allProductData.push(product)
    }

    res.json(allProductData)
}))

app.put('/removeCartItem', catchAsync(async (req, res) => {
    const { cartId, index, username } = req.body;
    const thisCart = await Cart.findById(cartId)
    if (thisCart.products.length === 1) {
        thisCart.remove();
        const user = await User.findOne({ username: username })
        user.cart = undefined;
        await user.save()
        res.status(200).json({ message: 'Successfully removed item.' })
    }
    else {
        thisCart.products.splice(index, 1)
        thisCart.quantity = thisCart.products.length
        await thisCart.save();
        res.json(thisCart)
        res.status(200).json({ message: 'Successfully removed item.' })
    }
}
))