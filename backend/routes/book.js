const express = require('express');
const router = express.Router();
const Book = require('../modles/book');
const fetchuser = require('../middleware/fetchuser');
const User = require('../modles/user');


router.post('/addBook', fetchuser, async (req, res) => {
    let success = false;
    try {
        const { name, description, price, language, image } = req.body;
        const newBook = new Book({
            name,
            description,
            price,
            language,
            image,
            user: req.user.id
        });

        // Save the new book to the database
        await newBook.save();
        success = true;
        res.status(201).json({ success: success, message: 'Book added successfully', Book: newBook });
    }
    catch (err) {
        console.log("Error adding the book: ", err.message);
        res.status(400).json("not able to add the book");
    }
})


router.get('/fetchAllBooks', fetchuser, async (req, res) => {
    let success = false;
    try {
        const books = await Book.find();
        success = true;
        res.status(201).json({ success: success, message: 'Book added successfully', Books: books });
    }
    catch (err) {
        console.log("Error fetching the books", err.message);
        res.status(400).json("not able to fetch the books");
    }
})


router.get('/fetchOneBook/:bookId', fetchuser, async (req, res) => {
    let success = false;
    try {
        const bookId = req.params.bookId;

        // Find the book by its ID
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        res.status(200).json({ success: true, message: 'Book fetched successfully', book });
    }
    catch (err) {
        console.log("Error fetching the books", err.message);
        res.status(400).json("not able to fetch the books");
    }
})


router.delete('/deleteBook/:bookId', fetchuser, async (req, res) => {
    let success = false;
    try {
        const bookId = req.params.bookId;

        // Find the book by its ID
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        console.log(book);
        await book.deleteOne();

        res.status(200).json({ success: true, message: 'Book deleted successfully', book });
    }
    catch (err) {
        console.log("error in deleting the book", err.message);
        res.status(400).json("erro in deleting the book");
    }
})


router.post('/addReview/:bookId', fetchuser, async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const { comment, rating } = req.body;
        console.log(req);
        console.log(req.body);

        if (!comment) {
            return res.status(400).json({ success: false, error: 'Comment is required' });
        }
        //find the book by book id
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        // Create a new review object
        const newReview = {
            user: req.user.id, // Assuming req.user contains user information
            comment,
            rating
        };

        // Add the new review to the book's reviews array
        book.reviews.push(newReview);

        // Save the book with the new review
        await book.save();

        res.status(200).json({ success: true, message: 'Review added successfully', book });
    } catch (err) {
        console.error("Error adding review:", err.message);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});


router.post('/addBookToCart/:bookId', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const bookId = req.params.bookId;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Check if the book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ success: false, error: 'Book not found' });
        }

        // Check if the book is already in the user's cart
        const isBookInCart = user.cart.some(item => item.book.toString() === bookId);
        if (isBookInCart) {
            return res.status(400).json({ success: false, error: 'Book is already in the cart' });
        }

        // Add the book to the user's cart
        user.cart.push({ book: bookId });
        await user.save();

        res.status(200).json({ success: true, message: 'Book added to cart successfully', user });
    } catch (err) {
        console.error('Error adding book to cart:', err.message);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

router.get('/fetchCartBooks', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Extract book IDs from the user's cart
        const bookIds = user.cart.map(item => item.book);

        res.status(200).json({ success: true, message: 'Book IDs fetched from cart successfully', bookIds });
    } catch (err) {
        console.error('Error fetching book IDs from cart:', err.message);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

router.delete('/removeBookFromCart/:bookId', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const bookId = req.params.bookId;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Find the index of the book in the user's cart
        const bookIndex = user.cart.findIndex(item => item.book.toString() === bookId);
        if (bookIndex === -1) {
            return res.status(404).json({ success: false, error: 'Book not found in the cart' });
        }

        // Remove the book from the user's cart
        user.cart.splice(bookIndex, 1);
        await user.save();

        res.status(200).json({ success: true, message: 'Book removed from cart successfully', user });
    } catch (err) {
        console.error('Error removing book from cart:', err.message);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});


module.exports = router;