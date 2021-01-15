const { Ingredient } = require('../models');
const { CREATE_FAILED, CREATE_SUCCESS, EXIST_ERROR } = require('../messages/event.response');

class IngredientService {

    constructor(){
        // ...
    }

    async createIngredient(name, price) {

        const exist  = await Ingredient.findOne({ name: name });
        if(exist) return { success: false, data: {message: `Ingredient ${EXIST_ERROR} in the ingredient bank.` }}
        
        // set data to the schema
        const ingredient = new Ingredient ({
            name: name,
            localPrice: price
        });
        
        try {
            // save the data
            await ingredient.save();
            return { success: true, data: {message: `Ingredient ${CREATE_SUCCESS}`}}
        }
        catch (err) {
            return { success: false, data: { message: `Ingredient ${CREATE_FAILED}`}}
        }
    }
}

module.exports = IngredientService;