import { getSession } from 'next-auth/react';

import withDb from '@/lib/withDb_mongoose';

const singleRecipe = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  const models = req.models;
  const recipeBody = req.body;
  const query = req.query;
  let recipe = null;
  const patchType = recipeBody?.patchType || '';

  // await new Promise((r) => setTimeout(r, 5000));

  try {
    let _set = {};
    switch (req.method) {
      case 'GET':
        recipe = await models.recipeModel.findOne({ recipeId: query.recipeId });
        /* recipe = await prisma.recipe.findUnique({
          where: {
            id: query.recipeId,
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

      case 'PUT':
        recipe = await models.recipeModel.findOneAndUpdate({ recipeId: query.recipeId }, recipeBody, {
          new: true,
        });

        /* recipe = await prisma.recipe.update({
          where: {
            id: query.recipeId,
          },
          data: {
            recipeBody,
          },
        }); */
        res.json({ data: recipe });
        break;

      case 'PATCH':
        if (patchType == 'photo')
          _set = {
            photo: recipeBody.photo,
          };
        else
          _set = {
            title: recipeBody.title,
            shortDesc: recipeBody.shortDesc,
            'description.text': recipeBody.description.text,
            ingredients: recipeBody.ingredients,
            serving: recipeBody.serving,
            time: recipeBody.time,
            difficulty: recipeBody.difficulty,
          };
        recipe = await models.recipeModel.findOneAndUpdate(
          { recipeId: query.recipeId },
          {
            $set: _set,
          },
          {
            new: true,
          }
        );
        /* 
        if (patchType == 'photo') {

          recipe = await prisma.recipe.update({
            where: {
              id: query.recipeId,
            },
            data: {
              photo: recipeBody.photo,
            },
          });
        } else {

          recipe = await prisma.recipe.update({
            where: {
              id: query.recipeId,
            },
            data: {
              
            },
          });
          
        } */

        res.json({ data: recipe });
        break;

      case 'DELETE':
        recipe = await models.recipeModel.findOneAndDelete({
          recipeId: query.recipeId,
        });
        res.json({ data: {} });
        break;
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'PATCH', 'DELETE']);
        console.log('req.method is ' + req.method);
        res.status(405).json({ error: 'This method is not accepted' });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export default withDb(singleRecipe);
// export default singleRecipe;
