const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    foodName: {
        type: String,
        required: true
    },
    goodFor: {
        type: String,
    },
    readyIn: {
        type: String
    },
    foodImages: [{
        type: String,
        required: true
    }],
    dateModified: {
        type: Date,
        default: Date.now
    },
    tags: [{
        tagName: String,
        color: String
    }],
    ingredients: [{
        name: String,
        amount: String,
        unit: String,
        price: {
            type: String,
            default: ""
        }
    }],
    instruction: [{
        type: String
    }],
    nutrition: {
        totalCalories: String,
        caloricBreakDown: {
            percentProtein: String,
            percentFat: String,
            percentCarbs: String
        }
    },
    ownerInfo: {
        id: String,
        name: String,
        profilePicture: String
    }

});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
