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