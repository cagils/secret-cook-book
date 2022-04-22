// import { ComponentMeta, ComponentStory } from '@storybook/react';
import SidebarLayout from './SidebarLayout';
import { mockSidebarLayoutProps } from './SidebarLayout.mocks';

const meta = {
  title: 'layouts/SidebarLayout',
  component: SidebarLayout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <SidebarLayout {...args} />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockSidebarLayoutProps.base,
};
