const mongoose = require('mongoose');
const { Schema } = mongoose;


const CartSchema = new Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book'
    }
});

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    cart: [CartSchema]

});

const User = mongoose.model('user', userSchema);
module.exports = User
