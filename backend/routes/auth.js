const express = require('express');
const router = express.Router();
const User = require('../modles/user');
const { body, validationResult } = require('express-validator');
// const fetchuser = require('../middleware/fetchuser');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'helloDuniya';

router.post('/createuser',
    [
        body('name', 'enter a valid name').isLength({ min: 3 }),
        body('email', 'enter a valid email').isEmail(),
        body('password', 'password should be 8 character long').isLength({ min: 8 })
    ],
    async (req, res) => {
        let success = false;
        console.log(req.body);
        try {

            // checking if there is some error in http request using express validator 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success, errors: errors.array() });
            }

            // here we are checking if user with that email already exist or not
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                res.status(403).json("Email already exists try another email");
            }


            // here we are encrypting our password using bcrypt liberay of npm
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            // now here we are creating the user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })

            // here we are generating a token using the user id

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authToken });

        }
        catch (err) {
            console.log("Error creating user: ", err.message);
            return res.status(400).json({ error: "not able to create a user due to some error in create user route" });
        }
    })

router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'enter a valid password').exists().isLength({ min: 8 })
],
    async (req, res) => {
        let success = false;
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success, error: errors.array() });
            }
            const { email, password } = req.body;
            let user = await User.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ success: 'user with these credential does not exist' });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(401).json({ success, error: "please try to login with correct password" });
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            success = true;
            const authToken = jwt.sign(data, JWT_SECRET);
            res.status(200).json({ success, authToken });
        }
        catch (err) {
            console.log('there is some error in logging in', err.message);
            return res.status(400).json({ success, error: "some problem in login route" });

        }
    })

router.get('/api/username/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ username: user.name });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;