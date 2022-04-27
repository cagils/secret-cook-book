import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MantineThemeOverride,
} from '@mantine/core';
import { useColorScheme, useHotkeys, useLocalStorage } from '@mantine/hooks';
import { getCookie, setCookies } from 'cookies-next';
import { GetServerSidePropsContext, NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactNode, useState } from 'react';
import './globals.css';

type GetLayout = (page: ReactNode) => ReactNode;

type Page<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayout;
};

type MyAppProps<P = {}> = AppProps<P> & {
  Component: Page<P>;
};

export default function App(props: MyAppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;

  const preferredColorScheme = useColorScheme();

  const [lsColorScheme, setLsColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    // when color scheme is updated save it to cookie
    setCookies('mantine-color-scheme', nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  const mantineTheme: MantineThemeOverride = {
    // Theme is deeply merged with default theme
    colorScheme: 'dark',
    other: {},
  };

  return (
    <>
      <Head>
        <title>Default Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
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
          {getLayout(<Component {...pageProps} />)}
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  // get color scheme from cookie
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});
