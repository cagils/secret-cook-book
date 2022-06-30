import { Box, Fade, Flex, Spinner, useColorMode } from '@chakra-ui/react';
import { useCallback } from 'react';

export const OverlayFader = ({ active, children }) => {
  const { colorMode } = useColorMode();
  const mode = useCallback(
    (lightValue, darkValue) => (colorMode == 'light' ? lightValue : darkValue),
    [colorMode]
  );

  return (
    <Fade in={active} unmountOnExit transition={{ duration: 2 }}>
      <Flex
        width="full"
        pos="absolute"
        left="0"
        top="0"
        bottom="0"
        right="0"
        m={0}
        p={0}
        //bg={mode('blackAlpha.700', 'blackAlpha.700')}
        bgGradient={mode(
          'linear(to-r, purple.100, pink.100)',
          'linear(to-r, purple.900, pink.900)'
        )}
        opacity={0.5}
        zIndex="10000"
        overflow="hidden"
        height="full"
        align="center"
        justify="center"
      >
        <Spinner color={mode('pink.300', 'pink.600')} size="xl" thickness={3} />
      </Flex>
    </Fade>
  );
};
