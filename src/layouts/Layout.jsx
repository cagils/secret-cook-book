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
  VStack
} from '@chakra-ui/react';
import { Moon, Sun } from '@styled-icons/feather';
import Link from 'next/link';
import { OverlayFader } from '../components/helpers/OverlayFader';

export const Layout = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const mode = (lightValue, darkValue) =>
    colorMode == 'light' ? lightValue : darkValue;

  const dark = colorMode === 'dark';

  return (
    <Flex
      justify="center"
      grow="1"
      minHeight="100vh"
      mx={{
        sm: '0em',
        md: '0em',
        lg: '0em',
        xl: '10em',
        '2xl': '12em',
        '3xl': '16em',
        '4xl': '30em',
        '5xl': '30em',
      }}
    >
      <VStack
        spacing={0}
        width="full"
        pos="relative"
        bgColor={mode('gray.100', 'gray.800')}
        align="stretch"
        justify="start"
      >
        <HStack
          align="center"
          justify="center"
          boxShadow="base"
          bgColor={mode('pink.100', 'blackAlpha.300')}
          bgGradient={mode(
            'linear(to-r, purple.200, pink.200)',
            'linear(to-r, purple.800, pink.600)'
          )}
        >
          <Box m="2" position="absolute" right={0} top={0}>
            <IconButton
              borderColor={mode('blackAlpha.400', 'whiteAlpha.400')}
              color={mode('blackAlpha.400', 'whiteAlpha.400')}
              _hover={{
                bgColor: mode('blackAlpha.200', 'whiteAlpha.200'),
              }}
              isRound
              variant="outline"
              onClick={() => toggleColorMode()}
              aria-label="Toggle color scheme"
              icon={
                <Icon
                  color={mode('blackAlpha.500', 'whiteAlpha.800')}
                  as={dark ? Sun : Moon}
                />
              }
            />
          </Box>
          <Box position="relative">
            <Heading
              textShadow="1px 1px 1px white"
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
          justify="center"
        >
          <HStack
            align="center"
            justify="center"
            boxShadow="base"
            bgColor={mode('pink.100', 'blackAlpha.300')}
            bgGradient={mode(
              'linear(to-r, purple.200, pink.200)',
              'linear(to-r, purple.800, pink.600)'
            )}
          >
            <Box m="2" position="absolute" right={0} top={0}>
              <IconButton
                borderColor={mode('blackAlpha.400', 'whiteAlpha.400')}
                color={mode('blackAlpha.400', 'whiteAlpha.400')}
                _hover={{
                  bgColor: mode('blackAlpha.200', 'whiteAlpha.200'),
                }}
                isRound
                variant="outline"
                onClick={() => toggleColorMode()}
                aria-label="Toggle color scheme"
                icon={
                  <Icon
                    color={mode('blackAlpha.500', 'whiteAlpha.800')}
                    as={dark ? Sun : Moon}
                  />
                }
              />
            </Box>
            <Box position="relative">
              <Heading
                textShadow="1px 1px 1px white"
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
            p={2}
          >
            {children}
          </Flex>
        </VStack>
      </Flex>
    </Flex>
  );
};
