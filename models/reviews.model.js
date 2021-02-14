const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    recipeId: {
        type: String,
        default: ""
    },
    rating: {
        type: Number,
    },
    comment: {
        type: String
    },
    ownerInfo: {
        _id: String,
        fullName: String,
        profilePicture: String
    }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
