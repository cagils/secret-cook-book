import { ColorModeScript } from '@chakra-ui/react';
import { Head, Html, Main, NextScript } from 'next/document';

import { customTheme } from '@/styles/theme';

export default function Document() {
  return (
    <Html lang="en">
      {/* TODO support other languages */}
      <Head>{/* Third party links, scripts */}</Head>
      <body>
        <ColorModeScript
          initialColorMode={customTheme.config.initialColorMode}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
