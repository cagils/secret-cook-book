const recipeMongooseSchema = {
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
};

export default recipeMongooseSchema;
