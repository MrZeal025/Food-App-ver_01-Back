const router = require('express').Router();
const { reviewController } = require('../controllers');
const { jwtAuth } = require('../middlewares');

/** auth.router is subjected with and appended url /api/auth */
/**
 * Route to log in a user
 * @param { email, password } req
 */
router.post('/new/comment', [jwtAuth], reviewController.createReview);  

router.get('/get/:id', reviewController.getAllreviews);

module.exports = router;