import { baseHost } from '../../../lib/siteConfig';
import withDb from '../../../lib/withDb_mongoose';
// import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';

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
        recipe = await models.recipeModel.findOneAndUpdate(
          { recipeId: query.recipeId },
          recipeBody,
          {
            new: true,
          }
        );

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

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'PATCH']);
        console.log('req.method is ' + req.method);
        res.status(405).json({ error: 'This method is not accepted' });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export default withDb(singleRecipe);
// export default singleRecipe;
