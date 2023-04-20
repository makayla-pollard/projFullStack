const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    movieId: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Review', reviewSchema);