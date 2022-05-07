//import { ComponentMeta, ComponentStory } from '@storybook/react';
import Ingredients from './Ingredients';
import { mockIngredientsProps } from './Ingredients.mocks';

const meta = {
  title: 'create-recipe/Ingredients',
  component: Ingredients,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Ingredients {...args} />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockIngredientsProps.base,
};
