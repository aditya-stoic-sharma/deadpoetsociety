const connectToMongo = require('./dbConnection');
connectToMongo(); // this line will connect the database mongodb with bckend
var cors = require('cors')
const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');

app.use(express.json())
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
app.use(cors());

// Defining routes for authentication 
app.use('/api/auth', require('./routes/auth'))
app.use('/api/book', require('./routes/book'))
app.use('/api/poetry', require('./routes/poetry'));
// app.use("/api/payment/", require('./routes/book'));


app.get('/', (req, res) => {
    res.send('hello aditya')
})


// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
