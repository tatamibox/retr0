const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    localId: {
        type: String,
        required: true
    },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    verified: {
        type: Boolean,
        default: false
    },
    cart: { type: Schema.Types.ObjectId, ref: 'Cart' }

})

const User = mongoose.model("User", userSchema)

module.exports = User;
