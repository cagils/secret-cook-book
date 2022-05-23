import { NextApiRequest, NextApiResponse } from 'next';

import getRecipe from '../../../lib/getRecipe';

const recipeId = async (req: NextApiRequest, res: NextApiResponse) => {
  const { recipeId } = req.query as { recipeId: string };
  try {
    const recipe = await getRecipe(recipeId);
    res.json({ data: recipe });
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
};

export default recipeId;
