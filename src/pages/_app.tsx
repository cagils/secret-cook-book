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

  const customTheme: MantineThemeOverride = {
    // Theme is deeply merged with default theme

    colorScheme: colorScheme,
    focusRing: 'auto',

    defaultRadius: 'lg', // or number

    white: '#ffffff',
    black: '#000000',

    colors: {
      brandA: [
        '#FDE7EF',
        '#FABDD2',
        '#F692B5',
        '#F36898',
        '#EF3E7A',
        '#EC135D',
        '#BD0F4B',
        '#8E0B38',
        '#5E0825',
        '#2F0413',
      ],
      brandB: [
        '#EDEAFB',
        '#CEC4F3',
        '#AE9EEB',
        '#8E78E3',
        '#6F52DB',
        '#4F2CD3',
        '#3F24A8',
        '#2F1B7E',
        '#201254',
        '#10092A',
      ],
    },

    primaryColor: 'brandA',
    primaryShade: { light: 5, dark: 6 },
    fontFamily: 'Open Sans',
    lineHeight: '1.55rem',
    transitionTimingFunction: 'ease',
    // fontFamilyMonospace: '',

    // fontSizes: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>;
    // radius: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>;
    // spacing: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>;
    // shadows: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>;
    // breakpoints: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>;
    /*     headings: {
      fontFamily: CSSProperties['fontFamily'];
      fontWeight: CSSProperties['fontWeight'];
      sizes: {
        h1: { fontSize: CSSProperties['fontSize']; lineHeight: CSSProperties['lineHeight'] };
        h2: { fontSize: CSSProperties['fontSize']; lineHeight: CSSProperties['lineHeight'] };
        h3: { fontSize: CSSProperties['fontSize']; lineHeight: CSSProperties['lineHeight'] };
        h4: { fontSize: CSSProperties['fontSize']; lineHeight: CSSProperties['lineHeight'] };
        h5: { fontSize: CSSProperties['fontSize']; lineHeight: CSSProperties['lineHeight'] };
        h6: { fontSize: CSSProperties['fontSize']; lineHeight: CSSProperties['lineHeight'] };
      }
    } */
    //fn: MantineThemeFunctions
    dir: 'ltr',
    loader: 'bars',
    // dateFormat: '',
    // datesLocale: '',

    other: {
      customProperty: 'custom',
    },
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
          theme={customTheme}
          emotionOptions={{ key: 'scb' }}
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
