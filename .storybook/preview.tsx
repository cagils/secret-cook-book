// @ts-nocheck
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MantineThemeOverride,
} from '@mantine/core';
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

export const parameters = { layout: 'fullscreen' };

function ThemeWrapper(props: any) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        withCSSVariables
        theme={{ colorScheme }}
      >
        <div>{props.children}</div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export const decorators = [
  (renderStory: any) => <ThemeWrapper>{renderStory()}</ThemeWrapper>,
];
