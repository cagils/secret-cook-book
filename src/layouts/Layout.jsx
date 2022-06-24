import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Icon,
  IconButton,
  useColorMode,
  useColorModeValue as mode,
  VStack,
} from '@chakra-ui/react';
import { Moon, Sun } from '@styled-icons/feather';
import Link from 'next/link';

export const Layout = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === 'dark';

  return (
    <Flex justify="center" grow="1" minHeight="100vh">
      <VStack
        gap="2"
        p="6"
        //bgColor={mode('purple.100', 'gray.800')}
        my="4"
        borderRadius="20"
        minWidth="80%"
      >
        <Box alignSelf="flex-end" m="2">
          <IconButton
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
        <Box px="12">
          <Heading size="2xl" p={2} color={mode('pink.500', 'pink.200')}>
            <Link href="/">
              <a>Secret Cook Book</a>
            </Link>
          </Heading>
        </Box>
        <Flex align="center" justify="center" grow="1" width="full">
          {children}
        </Flex>
      </VStack>
    </Flex>
  );
};
