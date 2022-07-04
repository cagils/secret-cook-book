import { withAuth } from '../../../../lib/withAuth';
import withDb from '../../../../lib/withDb';

const singleRecipe = async (req, res) => {
  const models = req.models;
  const recipeBody = req.body;
  const query = req.query;
  let recipe = null;

  // await new Promise((r) => setTimeout(r, 5000));

  try {
    if (!models) {
      throw Error('Could not find db connection');
    }
    switch (req.method) {
      case 'GET':
        recipe = await models.recipeModel.findOne({ recipeId: query.recipeId });
        res.json({ data: recipe });
        break;

      case 'POST':
        recipe = await models.recipeModel.create(recipeBody);
        res.json({ data: recipe });
        break;

      case 'PUT':
        recipe = await models.recipeModel.findOneAndUpdate(
          { recipeId: query.recipeId },
          recipeBody,
          {
            new: true,
          }
        );
        res.json({ data: recipe });
        break;

      case 'PATCH':
        recipe = await models.recipeModel.findOneAndUpdate(
          { recipeId: query.recipeId },
          {
            $set: {
              title: recipeBody.title,
              shortDesc: recipeBody.shortDesc,
              'description.text': recipeBody.description.text,
              ingredients: recipeBody.ingredients,
            },
          },
          {
            new: true,
          }
        );
        res.json({ data: recipe });
        break;

      default:
        console.log('req.method is ' + req.method);
        res.status(405).json({ error: 'This method is not accepted' });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export default withAuth(withDb(singleRecipe));
