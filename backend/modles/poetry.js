const mongoose = require('mongoose');
const { Schema } = mongoose;


const poetrySchema = new Schema({
    poetryData: {
        type: String,
        required: true
    },

    likes: {
        type: Number,
        default: 0
    },

});

const Poetry = mongoose.model('poetry', poetrySchema);
module.exports = Poetry