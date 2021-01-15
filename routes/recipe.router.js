const router = require('express').Router();
const { recipeController } = require('../controllers');
const { validate, jwtAuth } = require('../middlewares');
const { recipeSchema } = require('../validation/recipe.schema');

/** auth.router is subjected with and appended url /api/auth */
/**
 * Route to log in a user
 * @param { email, password } req
 */
router.post('/create', [jwtAuth, validate(recipeSchema)],  recipeController.createRecipe);  

module.exports = router;