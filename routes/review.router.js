const router = require('express').Router();
const { reviewController } = require('../controllers');
const { jwtAuth } = require('../middlewares');

/** auth.router is subjected with and appended url /api/auth */

router.post('/new/comment', [jwtAuth], reviewController.createReview);  

router.get('/get/:id', reviewController.getReiewPerRecipe);

router.get('/all-reviews', reviewController.getAllReviews);

module.exports = router;