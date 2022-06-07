import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  recipeId: {
    type: 'String',
  },
  userId: {
    type: 'String',
  },
  photo: {
    type: 'String',
  },
  title: {
    type: 'String',
  },
  shortDesc: {
    type: 'String',
  },
  serving: {
    type: 'Number',
  },
  difficulty: {
    type: 'Number',
  },
  time: {
    type: 'Number',
  },
  ingredients: {
    type: [
      {
        groupName: {
          type: 'String',
        },
        list: {
          type: ['String'],
        },
      },
    ],
  },
  description: {
    html: {
      type: 'String',
    },
    json: {},
  },
});

const recipeModel =
  mongoose.models.recipe ?? mongoose.model('recipe', recipeSchema);

const models = {
  recipeModel,
};

export default models;
