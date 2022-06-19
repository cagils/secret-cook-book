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

import 'focus-visible/dist/focus-visible';
import { customTheme } from '../styles/theme';
import './globals.css';

type GetLayout = (page: ReactNode) => ReactNode;

type Page<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayout;
};

type MyAppProps<P = {}> = AppProps<P> & {
  Component: Page<P>;
};

const queryClient = new QueryClient();

export default function App(props: MyAppProps) {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return (
    <ChakraProvider theme={customTheme}>
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  );
}
