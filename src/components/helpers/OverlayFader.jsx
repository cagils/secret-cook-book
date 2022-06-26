import { Box, Fade, Flex, Spinner, useColorMode } from '@chakra-ui/react';
import { useCallback } from 'react';

export const OverlayFader = ({ active, children }) => {
  const { colorMode } = useColorMode();
  const mode = useCallback(
    (lightValue, darkValue) => (colorMode == 'light' ? lightValue : darkValue),
    [colorMode]
  );

  return (
    <Box position="relative" overflow="hidden">
      <Fade in={active} transition={{ duration: 0.3 }}>
        <Box
          pos="absolute"
          left="0"
          top="0"
          bottom="0"
          right="0"
          bg={mode('blackAlpha.800', 'blackAlpha.800')}
          zIndex="10000"
        >
          <Flex height="full" align="center" justify="center">
            <Spinner
              color={mode('pink.300', 'pink.600')}
              size="xl"
              colorScheme="pink"
            />
          </Flex>
        </Box>
      </Fade>
      {children}
    </Box>
  );
};
