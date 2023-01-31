import mongoose from 'mongoose';

import recipeMongooseSchema from '@src/models/recipe.schema.mongoose';

const recipeSchema = new mongoose.Schema(recipeMongooseSchema);

const recipeModel = mongoose.models.recipe ?? mongoose.model('recipe', recipeSchema);

const models = {
  recipeModel,
};

export default models;
