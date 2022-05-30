// import recipes from './db/database.json';
import { connectDb } from './mongodb';

const getRecipe = async function getRecipe(recipeId) {
  const { recipesModel } = await connectDb();
  return await recipesModel.find({ recipeId: recipeId });
};

export default getRecipe;
