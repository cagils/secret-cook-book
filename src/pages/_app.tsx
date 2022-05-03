import {
  ChakraProvider,
  cookieStorageManager,
  extendTheme,
  Icon,
  localStorageManager,
} from '@chakra-ui/react';
import { getCookie, setCookies } from 'cookies-next';
import { GetServerSidePropsContext, NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactNode, useState } from 'react';
import customTheme from '../components/theme';
import './globals.css';

type GetLayout = (page: ReactNode) => ReactNode;

type Page<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayout;
};

type MyAppProps<P = {}> = AppProps<P> & {
  Component: Page<P>;
};

export default function App(props: MyAppProps) {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  const theme = extendTheme(customTheme);

  return (
    <ChakraProvider theme={theme}>
      <>
        <Head>
          <title>Default Page title</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>

        {getLayout(<Component {...pageProps} />)}
      </>
    </ChakraProvider>
  );
}
