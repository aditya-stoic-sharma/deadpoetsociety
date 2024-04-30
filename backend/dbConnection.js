const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/deadpoetsociety?tls=false&readPreference=primary&directConnection=true";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

module.exports = connectToMongo;