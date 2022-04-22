// import { ComponentMeta, ComponentStory } from '@storybook/react';
import PrimaryLayout from './PrimaryLayout';
import { mockPrimaryLayoutProps } from './PrimaryLayout.mocks';

const meta = {
  title: 'layouts/PrimaryLayout',
  component: PrimaryLayout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <PrimaryLayout {...args} />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockPrimaryLayoutProps.base,
};
