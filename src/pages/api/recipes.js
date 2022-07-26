import withDb from '../../lib/withDb_mongoose';
// import prisma from '../../lib/prisma';

const singleRecipe = async (req, res) => {
  const models = req.models;
  const recipeBody = req.body;
  const userId = req.query.userId;
  let recipe = null;

  try {
    if (!models) {
      throw Error('Could not find db connection');
    }
    switch (req.method) {
      case 'GET':
        console.log('userId is ' + userId);
        recipe = await models.recipeModel.find({ userId: userId });
        /* recipe = await prisma.recipe.findMany({
          where: {
            userId: userId,
          },
          include: {
            ingredients: {
              orderBy: { order: 'asc' },
              include: {
                list: {
                  orderBy: { order: 'asc' },
                },
              },
            },
            description: true,
          },
        }); */

        res.json({ data: recipe });
        break;

      case 'POST':
        recipe = await models.recipeModel.create(recipeBody);
        res.json({ data: recipe });
        break;

      default:
        res.status(405).json({ error: 'This method is not accepted' });
        break;
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export default withDb(singleRecipe);
// export default singleRecipe;
