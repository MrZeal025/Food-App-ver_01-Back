const { PantryService } = require('../services');
const pantryService = new PantryService();

/**
 * @route /api/recipe/create
 * @param { recipe body } req 
 */
exports.addToPantry = async (req, res) => {
    try {
        const register = await pantryService.addToPantry(req.body);
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

exports.readPantry = async (req, res) => {
    try {   
        const readAll = await pantryService.readPantry(req.params.id);
        if(readAll.success){
            return res.status(200).send(readAll);
        }
        else {
            return res.status(400).send(readAll);
        }
    }
    catch(err) {
        throw err
    }
}

exports.readPantryMinimalData = async (req, res) => {
    try {   
        const readAll = await pantryService.readPantryMinimal(req.params.id);
        if(readAll.success){
            return res.status(200).send(readAll);
        }
        else {
            return res.status(400).send(readAll);
        }
    }
    catch(err) {
        throw err
    }
}

exports.removeFromPantry = async (req, res) => {
    try {   
        const deleteRecipe = await pantryService.removeFromPantry(req.params.id);
        if(deleteRecipe.success){
            return res.status(200).send(deleteRecipe);
        }
        else {
            return res.status(400).send(deleteRecipe);
        }
    }
    catch(err) {
        throw err
    }
}