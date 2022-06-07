import withDb from '../../../../lib/withDb';

const recipeId = async (req, res) => {
  if (req.method === 'GET') {
    const { recipeId } = req.query;
    try {
      const models = req.models;
      const recipe = await models.recipeModel.find({ recipeId: recipeId });
      res.json({ data: recipe });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  } else if (req.method === 'POST') {
    // create recipe
  }
};

export default withDb(recipeId);
