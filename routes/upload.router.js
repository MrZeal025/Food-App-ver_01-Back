const router = require('express').Router();
const { uploadController } = require('../controllers');
const { jwtAuth } = require('../middlewares');

/**
 * Route to upload a profile picture
 * @param { request header id } req
 * @access { PRIVATE } requires authorization
 */
router.put("/profile/:id", [jwtAuth], uploadController.uploadProfile);

/**
 * Route to upload a cover photo
 * @param { request header id } req
 * @access { PRIVATE } requires authorization
 */
router.put("/cover-photo/:id", [jwtAuth], uploadController.uploadCoverPhoto);

module.exports = router;