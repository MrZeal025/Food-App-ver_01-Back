const { ReviewService } = require('../services');
const reviewService = new ReviewService();

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

exports.getAllReviews = async (req, res) => {
    try {
        const register = await reviewService.getAllReviews();
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

exports.getReiewPerRecipe = async (req, res) => {
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

