const { Schema, model } = require('mongoose');

const RecipesSchema = new Schema({
    recipeName: {
        type: string
    },
    recipeCreator: {
        type: string
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    ingredients: []
});

//create the recipes model using the schema
const Recipes = model('Recipes', RecipesSchema)

//export recipes model
module.exports = Recipes;