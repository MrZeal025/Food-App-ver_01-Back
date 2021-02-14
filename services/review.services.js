//  models
const { Review } = require('../models');
const { NOT_FOUND } = require('../messages/event.response');

/**
 * Module Admin
 * CRUD service
 * Handles the reading, updating of User
 */
class ReviewService {

    constructor () {
        // . . .
    }
    /**
     * Register a user
     * @param { String } fullName
     * @param { String } email
     * @param { String } password
     * @returns { Object <{ status: Boolean, data: Object, accessToken: String}>}
     * This tokens will be used for authorizatoin
     */
    async createNewReview(body) {

        const newReview = new Review({
            recipeId: body.recipeId,
            rating: body.rating,
            comment: body.comment,
            ownerInfo: {
                _id: body.ownerInfo._id,
                fullName: body.ownerInfo.fullName,
                profilePicture: body.ownerInfo.profilePicture
            }
        })
        try {
            const comment = await newReview.save();
            return { success: true, data: comment}
        }
        catch(err) {
            return { success: false, data: { error: err.errors}} 
        }
    }

    async getReviews(id) {
        try {
            const reviews = await Review.find({ recipeId: id })
            return { success: true, data: reviews}
        } 
        catch (error) {
            return { success: false, data: { error: error.errors}} 
        }
    }
}

module.exports = ReviewService;