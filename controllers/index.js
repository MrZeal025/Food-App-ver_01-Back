const authController = require('./auth.controller');
const uploadController = require('./upload.controller');
const userController = require('./user.controller');
const recipeController = require('./recipe.controller');
const adminController = require('./admin.controller');
const reviewController = require('./review.controller');
const pantryController  = require('./pantry.controller');

module.exports = {
  authController,
  uploadController,
  userController,
  recipeController,
  adminController,
  reviewController,
  pantryController
};
