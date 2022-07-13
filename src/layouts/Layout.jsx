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
import { SignOut } from '@styled-icons/octicons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import { useEffect, useState } from 'react';
// import { Account } from '../components/auth/SupabaseAccount';
import { OverlayFader } from '../components/helpers/OverlayFader';
// import { useAuth } from '../lib/hooks/useAuth';
import { signIn, signOut, useSession } from 'next-auth/react';
import { supabase } from '../lib/supabase';

export const Layout = ({ children }) => {
  // const { user, signUp, signIn, signOut } = useAuth();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const mode = (lightValue, darkValue) =>
    colorMode == 'light' ? lightValue : darkValue;

  const dark = colorMode === 'dark';

  useEffect(() => {
    if (router.pathname === '/auth/login') {
      if (session) {
        router.push('/');
      }
    } else if (!session) {
      router.push('/auth/login');
    }
    setLoading(false);
  }, [router, session]);

  return (
    <Flex grow="1">
      <VStack width="full">
        <NextNProgress
          color="var(--chakra-colors-pink-400)"
          startPosition={0.5}
          stopDelayMs={10}
          height={2}
          showOnShallow={true}
        />
        {!loading && (
          <Flex
            bgGradient={mode(
              'linear(to-t, pink.100, pink.200)',
              'linear(to-b, gray.600, gray.800)'
            )}
            justify="center"
            mx="auto"
            grow="1"
            width="full"
            minHeight="100vh"
          >
            <Flex maxWidth="2200px" flex="1" mx="auto">
              <VStack
                spacing={0}
                width="full"
                pos="relative"
                bgColor={mode('gray.100', 'gray.800')}
                align="stretch"
                justify="center"
              >
                <HStack
                  align="center"
                  justify="center"
                  // boxShadow="base"
                  bgColor={mode('pink.100', 'blackAlpha.300')}
                  bgGradient={mode(
                    'linear(to-r, purple.200, pink.200)',
                    'linear(to-r, purple.800, pink.600)'
                  )}
                >
                  <Box px="3em">
                    <Box
                      m="2"
                      position="absolute"
                      right={0}
                      top={0}
                      px={{ base: '2', sm: '2', md: '4', xl: '5', '2xl': '5' }}
                      bottom="unset"
                      left="unset"
                      zIndex="1000"
                    >
                      <IconButton
                        colorScheme="pink"
                        //borderColor={mode('blackAlpha.500', 'whiteAlpha.500')}
                        //color={mode('blackAlpha.400', 'whiteAlpha.400')}
                        /* _hover={{
                      bgColor: mode('pink.600', 'purple.600'),
                    }} */
                        bgColor={mode('pink.300', 'pink.500')}
                        isRound
                        variant="solid"
                        onClick={() => signOut()}
                        aria-label="Sign Out"
                        icon={
                          <Icon
                            fontSize="28px"
                            color={mode('whiteAlpha.600', 'whiteAlpha.600')}
                            as={SignOut}
                          />
                        }
                      />
                      <IconButton
                        colorScheme="pink"
                        //borderColor={mode('blackAlpha.500', 'whiteAlpha.500')}
                        //color={mode('blackAlpha.400', 'whiteAlpha.400')}
                        /* _hover={{
                      bgColor: mode('pink.600', 'purple.600'),
                    }} */
                        bgColor={mode('pink.300', 'pink.500')}
                        isRound
                        variant="solid"
                        onClick={() => toggleColorMode()}
                        aria-label="Toggle color scheme"
                        icon={
                          <Icon
                            fontSize="28px"
                            color={mode('whiteAlpha.600', 'whiteAlpha.600')}
                            as={dark ? Sun : Moon}
                          />
                        }
                      />
                    </Box>
                    <Heading
                      textShadow="1px 1px 1px white"
                      variant="big"
                      as="h1"
                      textAlign="center"
                      size="2xl"
                      py={4}
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
                  //p={2}
                >
                  {children}
                </Flex>
              </VStack>
            </Flex>
          </Flex>
        )}
      </VStack>
    </Flex>
  );
};
