const { RecipeService } = require('../services');
const recipeService = new RecipeService();

/**
 * @route /api/recipe/create
 * @param { recipe body } req 
 */
exports.createRecipe = async (req, res) => {
    try {
        const register = await recipeService.createRecipe(req.body);
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

exports.readRecipe = async (req, res) => {
    try {   
        const readAll = await recipeService.getAllRecipe();
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

exports.deleteRecipe = async (req, res) => {
    try {   
        const deleteRecipe = await recipeService.deleteRecipe(req.params.id);
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