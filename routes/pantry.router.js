const router = require('express').Router();
const { pantryController } = require('../controllers');

router.post('/add', pantryController.addToPantry);  
router.get('/read/:id', pantryController.readPantry); 
router.get('/read-checker/:id', pantryController.readPantryMinimalData); 
router.delete('/remove/:id', pantryController.removeFromPantry); 

module.exports = router;