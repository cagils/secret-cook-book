import recipes from './db/database.json';

const getRecipe = async function getRecipe(recipeId) {
  return recipes.find((recipe) => recipe.recipeId === recipeId);
};

export default getRecipe;
