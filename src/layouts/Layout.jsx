import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import { Moon, Sun } from '@styled-icons/feather';
import { SignOut } from '@styled-icons/octicons';
import { signOut, useSession } from 'next-auth/react';
import * as ImageNext from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { default as NextNProgress } from 'nextjs-progressbar';
import SCBLogo from 'public/images/SecretCookBookLogoT.png';

export const Layout = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const mode = (lightValue, darkValue) =>
    colorMode == 'light' ? lightValue : darkValue;

  const dark = colorMode === 'dark';

  /* useEffect(() => {
    if (router.pathname === '/auth/login') {
      if (session) {
        router.push('/');
      }
    } else if (!session) {
      router.push('/auth/login');
    }
  }, [router, session]); */

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
        {!status?.loading && (
          <Flex
            bgGradient={mode(
              'linear(to-t, pink.100, pink.200)',
              'linear(to-b, gray.600, gray.800)'
            )}
            justifyContent="center"
            mx="auto"
            grow="1"
            width="full"
            minHeight="100vh"
          >
            <Flex maxWidth="2200px" w="full" grow="1" mx="auto">
              <VStack
                spacing={0}
                width="full"
                // pos="relative"
                bgColor={mode('gray.100', 'gray.800')}
                // alignItems="stretch"
                justifyContent="center"
              >
                <HStack
                  w="full"
                  alignItems="center"
                  justifyContent="center"
                  // boxShadow="base"
                  // bgColor={'white'}
                  // bgColor={mode('pink.100', 'blackAlpha.300')}
                  // bgGradient={mode(
                  //   'linear(to-r, purple.200, pink.200)',
                  //   'linear(to-r, purple.800, pink.600)'
                  // )}
                >
                  <VStack
                    width="full"
                    // borderBottomWidth="thin"
                    // borderBottomColor={mode('pink.400', 'pink.400')}
                    // display="flex"
                    pos="relative"
                    spacing={0}
                  >
                    <Flex
                      wrap="wrap"
                      // border="1px solid red"
                      // position={{ base: 'initial', md: 'absolute' }}
                      alignSelf="stretch"
                      justifyContent="end"
                      alignItems="start"
                      // right={2}
                      // top={2}
                      // px={{ base: '2', sm: '2', md: '4', xl: '5', '2xl': '5' }}
                      // bottom={0}
                      // left={0}
                      zIndex="1000"
                    >
                      <Flex p={2} m={2}>
                        {session && (
                          <Text
                            color={mode('pink.600', 'pink.200')}
                            fontSize="0.8em"
                            textAlign="end"
                            mr={2}
                          >
                            {session.user.email}
                            <br />
                            via {session.user.provider}
                          </Text>
                        )}
                        {session && (
                          <Image
                            referrerPolicy="no-referrer"
                            height="40px"
                            src={session.user.image}
                            alt="avatar"
                            mr={2}
                          />
                        )}
                        {session && (
                          <IconButton
                            mr={2}
                            // float="right"
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
                        )}
                        <IconButton
                          // float="right"
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
                      </Flex>
                    </Flex>
                    <Flex
                      // flexDir="row"
                      // flex="1"
                      grow="1"
                      // pos="relative"
                      // display="flex"
                      w="full"
                      // border="1px solid red"
                      zIndex="300"
                    >
                      <Box
                        // minWidth="6rem"
                        justifyContent="center"
                        alignItems="center"
                        // width="8rem"
                        // height="8rem"
                        // pos="relative"
                        // w="full"
                        // flex="1"
                      >
                        <Link passHref href="/">
                          <Flex
                            wrap="wrap"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Image
                              width="10rem"
                              // minWidth="10rem"
                              height="10rem"
                              alt="Secret Cook Book Logo"
                              src={'/images/SecretCookBookLogoT.png'}
                            />
                            <Heading
                              // flex="1"
                              // minWidth="60rem"
                              // border="1px solid red"
                              // alignItems="flex-start"
                              // textShadow="2px 2px 2px white"
                              // variant="big"
                              as="h1"
                              // textAlign="center"
                              fontSize={{
                                base: '1.5em',
                                sm: '2em',
                                md: '2.5em',
                                lg: '2.5em',
                                xl: '3em',
                              }}
                              // py={4}
                              fontFamily="quote"
                              color={mode('pink.500', 'pink.400')}
                              textAlign="center"
                            >
                              create | share | enjoy
                              <Text
                                fontSize="1rem"
                                fontWeight="light"
                                color={mode('gray.600', 'gray.400')}
                                pb={2}
                              >
                                kitchen secrets shared with special ones
                              </Text>
                            </Heading>
                          </Flex>
                        </Link>
                      </Box>
                    </Flex>
                  </VStack>
                </HStack>
                {/* <OverlayFader active={user} /> */}
                {/* {(router.pathname === '/auth/login' || session?.user) && ( */}
                <>
                  <Box
                    bgGradient={mode(
                      'linear(to-r, purple.200, pink.200)',
                      'linear(to-r, purple.800, pink.600)'
                    )}
                    width="full"
                    // border="1px solid red"
                    h={'1px'}
                  ></Box>
                  <Flex
                    grow="1"
                    justifyContent="center"
                    alignItems="stretch"
                    bgGradient={mode(
                      'linear(to-r, purple.100, pink.100)',
                      'linear(to-r, purple.900, pink.900)'
                    )}
                    //p={2}
                    w="full"
                    // border="1px solid red"
                  >
                    {children}
                  </Flex>
                </>
                {/*     )} */}
              </VStack>
            </Flex>
          </Flex>
        )}
      </VStack>
    </Flex>
  );
};
