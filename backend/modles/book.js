const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userName: {
        type: String,
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },

});

const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true,
        unique: true
    },

    price: {
        type: Number,
        required: true
    },

    language: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    userName: {
        type: String // Add a field to store the username
    },

    reviews: [reviewSchema],

});

bookSchema.pre('find', function (next) {
    this.populate('user', 'name'); // Populate the 'user' field with 'name' only
    next();
});

// Post-processing to set the userName field based on the populated user field
bookSchema.post('find', function (books) {
    books.forEach(book => {
        if (book.user && book.user.name) {
            book.userName = book.user.name;
        }
    });
});




const Book = mongoose.model('book', bookSchema);
module.exports = Book