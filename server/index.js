const express = require('express');
const app = express();
const axios = require('axios');

const dotenv = require('dotenv');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const corsOptions = {
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());

app.listen(3001, () => {
    console.log('Server listening on port 3001')
})

app.post('/', (req, res) => {
    res.json({ message: 'This connection works' })
})

