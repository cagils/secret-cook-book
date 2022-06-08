import getRecipe from '../../../lib/getRecipe';

const recipeId = async (req, res) => {
  if (req.method === 'GET') {
    const { recipeId } = req.query;
    try {
      const recipe = await getRecipe(recipeId);
      res.json({ data: recipe });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
};

export default recipeId;
