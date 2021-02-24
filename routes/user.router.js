const router = require('express').Router();
const { userController } = require('../controllers');
const { jwtAuth } = require('../middlewares');

/** auth.router is subjected with and appended url /api/auth */
/**
 * Route to log in a user
 * @param { email, password } req
 */
router.get('/profile/read/:id', [jwtAuth], userController.readOneProfile);  

router.get('/all', [jwtAuth], userController.getAll);

module.exports = router;