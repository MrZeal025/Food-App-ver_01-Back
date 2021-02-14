const { ReviewService } = require('../services');
const reviewService = new ReviewService();

/**
 * @route /api/recipe/create
 * @param { recipe body } req 
 */
exports.createReview = async (req, res) => {
    try {
        const register = await reviewService.createNewReview(req.body);
        if(register.success){
            return res.status(200).send(register);
        }
        else {
            return res.status(400).send(register);
        }
    } 
    catch (err) {
        throw err
    }
}

exports.getAllreviews = async (req, res) => {
    try {
         const register = await reviewService.getReviews(req.params.id);
        if(register.success){
            return res.status(200).send(register);
        }
        else {
            return res.status(400).send(register);
        }
    } 
    catch (error) {
        throw err
    }
}
