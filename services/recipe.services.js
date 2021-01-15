const { Recipe } = require('../models');
const { CREATE_FAILED, CREATE_SUCCESS } = require('../messages/event.response');
const IngredientService = require('./ingredient.services');

class RecipeService {
    
    constructor(){
        // ...
    }

    async createRecipe(recipe){
        const ingredientService = new IngredientService();
        
        // process the data on the ingredient key
        recipe.ingredients.map(async ingredient => {
            // saving the ingredients
            const saveIngredient =  await ingredientService.createIngredient(ingredient.name, ingredient.price);
            
            if(!saveIngredient.success) return { success: false, data: {message: `Ingredient ${CREATE_FAILED}`}}
        })

        const newRecipe = new Recipe({
            foodName: recipe.foodName,
            goodFor: recipe.goodFor,
            readyIn: recipe.readyIn,
            tags: recipe.tags,
            ingredients: recipe.ingredients,
            instruction: recipe.instruction,
            nutrition: recipe.nutrition,
            ownerInfo: recipe.ownerInfo
        })

        try {
            await newRecipe.save();
            return { success: true, data: {message: `Recipe ${CREATE_SUCCESS}`}}
        }
        catch(err) {
            console.log(err)
            return { success: false, data: { message: `Recipe ${CREATE_FAILED}` }}
        }
    }
}

module.exports = RecipeService;