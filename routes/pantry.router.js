const router = require('express').Router();
const { pantryController } = require('../controllers');

router.post('/add', pantryController.addToPantry);  
router.get('/read/:id', pantryController.readPantry); 
router.delete('/remove', pantryController.removeFromPantry); 

module.exports = router;