const catchAsync = require('./utils/catchAsync');
const express = require('express');
const app = express();
const axios = require('axios');
const User = require('./models/User')
const Product = require('./models/Product')

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
    res.json({ username: currentUser.username })
}))

app.post('/uploadProduct', catchAsync(async (req, res) => {
    const { username, product, imageURL, price } = req.body;
    const newProduct = new Product({ username: username, name: product, imageURL: imageURL, price: price });
    await newProduct.save();
    const currentUser = await User.findOne({ username: username })


    currentUser.products.push(newProduct);
    currentUser.save();


}))