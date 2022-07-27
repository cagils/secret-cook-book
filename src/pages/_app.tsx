import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactNode, useState } from 'react';

import '@/styles/globals.css';
import { customTheme } from '@/styles/theme';

type GetLayout = (page: ReactNode) => ReactNode;

type Page<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayout;
};

type MyAppProps<P = {}> = AppProps<P> & {
  Component: Page<P>;
};

export default function App(props: MyAppProps) {
  const { Component, pageProps } = props;

  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Secret Cook Book</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={pageProps.session}>
          <ChakraProvider theme={customTheme}>
            {getLayout(<Component {...pageProps} />)}
          </ChakraProvider>
        </SessionProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
