import db from './db/database.json';

const getRecipe = async function getRecipe() {
  const data = db[0];
  return data;
};

export default getRecipe;
