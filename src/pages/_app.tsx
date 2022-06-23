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
import '../styles/globals.css';
import { customTheme } from '../styles/theme';

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
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>Secret Cook Book</title>
      </Head>

      <ChakraProvider theme={customTheme}>
        <Flex grow="1">
          <NextNProgress
            color={customTheme.colors.pink[200]}
            startPosition={0.5}
            stopDelayMs={10}
            height={2}
            showOnShallow={true}
          />
          {getLayout(<Component {...pageProps} />)}
        </Flex>
      </ChakraProvider>
    </>
  );
}
