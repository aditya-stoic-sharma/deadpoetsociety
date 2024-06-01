const express = require('express');
const router = express.Router();
const Book = require('../modles/book');
const fetchuser = require('../middleware/fetchuser');
const User = require('../modles/user');
const mongoose = require('mongoose');
const Razorpay = require("razorpay");
const crypto = require("crypto");


router.post('/addBook', fetchuser, async (req, res) => {
    let success = false;
    try {
        const { name, description, price, language } = req.body;
        const image = "not yet described"
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
        const objectId = new mongoose.Types.ObjectId(bookId);
        // Find the book by its ID
        const book = await Book.findById(objectId);

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

        const userId = req.user.id;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        let userName = user.name;

        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        // Create a new review object
        const newReview = {
            user: req.user.id, // Assuming req.user contains user information
            userName,
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
        // const bookIds = user.cart.map(item => item.book);

        const cart = user.cart;

        if (!Array.isArray(cart)) {
            return res.status(400).json({ error: 'Cart should be an array' });
        }

        // Extract book IDs from the cart array
        const bookIds = cart.map(item => item.book);

        // Convert each book ID string to mongoose ObjectId
        const bookObjectIds = bookIds.map(id => new mongoose.Types.ObjectId(id));

        // Find books based on the provided book IDs
        const books = await Book.find({ _id: { $in: bookObjectIds } });

        // res.json({ books });


        res.status(200).json({ success: true, message: 'Book IDs fetched from cart successfully', books });
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

router.delete('/removeBooksFromCart', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const bookIds = req.body.bookIds;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Iterate through each book ID and remove it from the user's cart
        bookIds.forEach(async (bookId) => {
            const bookIndex = user.cart.findIndex(item => item.book.toString() === bookId);
            if (bookIndex !== -1) {
                user.cart.splice(bookIndex, 1);
            }
        });

        await user.save();

        res.status(200).json({ success: true, message: 'Books removed from cart successfully', user });
    } catch (err) {
        console.error('Error removing books from cart:', err.message);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});


router.get('/booksByIds', async (req, res) => {
    try {
        console.log("hello");
        const { cart } = req.body;

        // Validate if cart is an array
        if (!Array.isArray(cart)) {
            return res.status(400).json({ error: 'Cart should be an array' });
        }

        // Extract book IDs from the cart array
        const bookIds = cart.map(item => item.book);

        // Convert each book ID string to mongoose ObjectId
        const bookObjectIds = bookIds.map(id => new mongoose.Types.ObjectId(id));

        // Find books based on the provided book IDs
        const books = await Book.find({ _id: { $in: bookObjectIds } });

        res.json({ books });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});
const KEY_ID = "rzp_test_wuYKr643pfuMVV"
const KEY_SECRET = "EAwPPzZj9QptybvUo8sx1Hvs"
router.post("/orders", async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: KEY_ID,
            key_secret: KEY_SECRET,
        });
        const options = {
            amount: req.body.amount,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        instance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            res.status(200).json({ data: order });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
});

router.post("/verify", async (req, res) => {
    try {
        console.log("hello there ");
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            return res.status(200).json({ message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ message: "Invalid signature sent!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
});


module.exports = router;