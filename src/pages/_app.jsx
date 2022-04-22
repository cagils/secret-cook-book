import { MantineProvider } from '@mantine/core';
import '../styles/globals.css';

function App(props) {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout || ((page) => page);

  return (
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
  );
}

export default App;
