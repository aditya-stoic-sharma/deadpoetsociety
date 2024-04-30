const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Poetry = require('../modles/poetry')


router.post('/addPoetry', fetchuser, async (req, res) => {
    let success = false;
    try {
        const { poetryData, likes } = req.body;
        const newPoetry = new Poetry({
            poetryData,
        });

        // Save the new book to the database
        await newPoetry.save();
        success = true;
        res.status(201).json({ success: success, message: 'poetry added successfully', Poetry: newPoetry });
    }
    catch (err) {
        console.log("Error adding the poetry: ", err.message);
        res.status(400).json("not able to add the poetry");
    }
})

router.get('/fetchAllpoetry', fetchuser, async (req, res) => {
    let success = false;
    try {
        const allPoetries = await Poetry.find();
        success = true;
        res.status(200).json({ success: success, allPoetries: allPoetries });
    }
    catch (err) {
        console.log("error fetching the poetry");
        res.status(404).json({ success: success, message: "not able to find the poetries" })
    }
})



router.post('/incLike', fetchuser, async (req, res) => {
    let success = false;
    try {
        const { poetryId } = req.body;
        const poet = await Poetry.findById(poetryId);
        poet.likes += 1;
        await poet.save();
        res.status(200).json({ message: "like added successfully", poetry: poet })
    }
    catch (err) {
        console.log("error is ", err);
        res.status(404).json({ message: "not able to like" });
    }
})

module.exports = router;