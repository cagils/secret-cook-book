import {
  ChakraProvider,
  cookieStorageManager,
  extendTheme,
  Flex,
  Icon,
  localStorageManager,
} from '@chakra-ui/react';
import { getCookie, setCookies } from 'cookies-next';
import { GetServerSidePropsContext, NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

import NextNProgress from 'nextjs-progressbar';
import { customTheme } from '../styles/theme';
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

  return (
    <ChakraProvider theme={customTheme}>
      <Flex grow="1">
        <NextNProgress
          color={customTheme.colors['pink']['200']}
          startPosition={0.5}
          stopDelayMs={10}
          height={2}
          showOnShallow={true}
        />
        {getLayout(<Component {...pageProps} />)}
      </Flex>
    </ChakraProvider>
  );
}
