const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const pantrySchema = new Schema({
    recipeId: {
        type: String,
        required: true
    },
    ownerId: {
        type: String,
        required: true
    }
});

const Pantry = mongoose.model('Pantry', pantrySchema);
module.exports = Pantry;
