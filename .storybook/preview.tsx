import { NextPage } from 'next';
import { AppProps } from 'next/app';
import * as NextImage from 'next/image';
import React, { ReactNode, useState } from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import '../src/pages/globals.css';

type GetLayout = (page: ReactNode) => ReactNode;

type Page<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayout;
};

type MyAppProps<P = {}> = AppProps<P> & {
  Component: Page<P>;
};

// Allow Storybook to handle Next's <Image> component
const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  // viewport: { viewports: customViewports },
  layout: 'fullscreen',
  // chakra: {},
};
