const { Pantry, Recipe } = require('../models');
const { CREATE_FAILED, CREATE_SUCCESS, EXIST_ERROR } = require('../messages/event.response');

class IngredientService {

    constructor(){
        // ...
    }

    async addToPantry(body) {

        const exist  = await Pantry.findOne({ recipeId: body.recipeId });
        if(exist) return { success: false, data: {message: `Recipe ${EXIST_ERROR} is already in the pantry.` }}
        
        const newPantry = new Pantry({
            recipeId: body.recipeId,
            ownerId: body.ownerId
        });
        try {
            // save the data
            await newPantry.save();
            return { success: true, data: {message: `Recipe ${CREATE_SUCCESS} on the pantry`}}
        }
        catch (err) {
            return { success: false, data: { message: `Recipe ${CREATE_FAILED} on the pantry`}}
        }
    }

    async readPantry(id){
        const getItem = await Pantry.find({ ownerId: id });
        let recipes = [];
        for(let i = 0; i < getItem.length; i++) {
            const getRecipes = await Recipe.findById(getItem[i].recipeId)
            recipes.push(getRecipes)
        }
        try {
            return { success: true, data: recipes }
        }
        catch (err) {
            return { success: false, data: [] }
        }
    }

}

module.exports = IngredientService;