import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import { Moon, Sun } from '@styled-icons/feather';
import Link from 'next/link';

export const Layout = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const mode = (lightValue, darkValue) =>
    colorMode == 'light' ? lightValue : darkValue;

  const dark = colorMode === 'dark';

  return (
    <Flex justify="center" grow="1" minHeight="100vh">
      <VStack
        spacing={0}
        width="full"
        pos="relative"
        bgColor={mode('gray.100', 'gray.800')}
      >
        <HStack>
          <Box m="2" position="absolute" right={0} top={0}>
            <IconButton
              colorScheme="pink"
              bgGradient={mode(
                'linear(to-t, purple.200, pink.200)',
                'linear(to-t, purple.800, pink.600)'
              )}
              isRound
              variant="solid"
              //colorScheme={mode('purple', 'purple')}
              onClick={() => toggleColorMode()}
              aria-label="Toggle color scheme"
              icon={
                <Icon color={mode('blue', 'yellow')} as={dark ? Sun : Moon} />
              }
            />
          </Box>
          <Box position="relative">
            <Heading
              variant="big"
              as="h1"
              textAlign="center"
              size="2xl"
              p={2}
              color={mode('purple.500', 'purple.300')}
            >
              <Link href="/">
                <a>Secret Cook&nbsp;Book</a>
              </Link>
            </Heading>
          </Box>
        </HStack>
        <Flex
          grow="1"
          justify="center"
          align="stretch"
          bgGradient={mode(
            'linear(to-r, purple.100, pink.100)',
            'linear(to-r, purple.900, pink.900)'
          )}
        >
          {children}
        </Flex>
      </VStack>
    </Flex>
  );
};
