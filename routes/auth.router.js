const router = require('express').Router();
const { authController } = require('../controllers');
const { validate } = require('../middlewares');
const { registerSchema, loginSchema } = require('../validation/auth.schema');

/** auth.router is subjected with and appended url /api/auth */
/**
 * Route to log in a user
 * @param { email, password } req
 */
router.post('/login',[validate(loginSchema)],  authController.login);  
/**
 * Route to register a user
 * @param { firstName, lastName, email, password } req
 */
router.post('/register', [validate(registerSchema)], authController.register); 

// @route   GET api/auth/verify/:id
// @desc    Verify user
// @access  Public
router.get("/verify/:id", authController.verify);


module.exports = router;