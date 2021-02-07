const Joi = require('@hapi/joi');
const builder = require('../messages/builder');

const recipeSchema = Joi.object ()
.keys({
    foodName: Joi.string()
        .max(100)    
        .required()
        .messages(builder({ field: "Food name", max: 100})),
    goodFor: Joi.string()
        .messages(builder({ field: "Food meal capacity" })),
    readyIn: Joi.string()
        .messages(builder({ field: "Cooking duration"})),
    foodImages: Joi.array()
        .items(Joi.string().required()) 
        .required()
        .messages(builder({ field: 'Image/s' })),
    tags: Joi.array()
        .items({
            tagName: Joi.string().required().messages(builder({ field: "Tag name"})),
            color: Joi.string().required().messages(builder({field: "Color"}))
        })
        .required()
        .messages(builder({ field: 'Tags'})),
    ingredients: Joi.array()
        .items({
            name: Joi.string().allow('').messages(builder({ field: "Name" })),
            amount: Joi.string().allow('').messages(builder({ field: "Amount" })),
            unit: Joi.string().allow('').messages(builder({ field: "Unit" })),
            price: Joi.string().allow('').messages(builder({ field: "Price" }))
        })
        .required()
        .messages(builder({ field: 'Ingredients'})),
    instruction: Joi.array()
        .required()
        .messages(builder({ field: 'Instriction'})),
    nutrition: Joi.object()
        .keys({
            totalCalories: Joi.string().messages(builder({ field: "Total Calories"})),
            caloricBreakDown: Joi.object()
                .keys({
                    percentProtein: Joi.string().messages(builder({ field: "Protain Percentage"})),
                    percentFat: Joi.string().messages(builder({ field: "Fat Percentage"})),
                    percentCarbs: Joi.string().messages(builder({ field: "Carbohydrates Percentage"}))
                })
        })
        .messages(builder({ field: "Nutrition"})),
    ownerInfo: Joi.object()
        .keys({
            id: Joi.string().required().messages(builder({ field: "User ID"})),
            name: Joi.string().required().messages(builder({ field: "Owner name"}))
        })
});

module.exports = {
    recipeSchema
}