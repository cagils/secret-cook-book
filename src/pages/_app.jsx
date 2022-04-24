import { MantineProvider } from '@mantine/core';
import './globals.css';

function App(props) {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);

  /*   return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
        }}
      >
        {getLayout(<Component {...pageProps} />)}
      </MantineProvider>
    </>
  ); */
}

export default App;
