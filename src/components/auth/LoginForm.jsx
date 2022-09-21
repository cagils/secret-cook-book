import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Heading,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorMode,
  VStack,
} from '@chakra-ui/react';

import { useRef, useState } from 'react';

import { FInputNoHook } from '@/components/helpers/form/FInputNoHook';
import { GoogleGLogo } from '@/resources/svgs';
import { Github } from '@styled-icons/boxicons-logos';
import { Email } from '@styled-icons/entypo';
import { OverlayFader } from '../helpers/OverlayFader';

const errors = {
  Signin: 'Try signing with a different account.',
  OAuthSignin: 'Try signing with a different account.',
  OAuthCallback: 'Try signing with a different account.',
  OAuthCreateAccount: 'Try signing with a different account.',
  EmailCreateAccount: 'Try signing with a different account.',
  Callback: 'Try signing with a different account.',
  OAuthAccountNotLinked: 'To confirm your identity, sign in with the same account you used originally.',
  EmailSignin: 'Please provide a valid email address.',
  CredentialsSignin: 'Sign in failed. Check the details you provided are correct.',
  default: 'Unable to sign in.',
};

const SignInMessage = ({ error, message }) => {
  const errorMessage = error && (errors[error] ?? errors.default);
  return error ? (
    <Alert status="error" variant="left-accent">
      <AlertIcon />
      {errorMessage}
    </Alert>
  ) : (
    <Alert status="success" variant="left-accent">
      <AlertIcon />
      {message}
    </Alert>
  );
};

export const LoginForm = ({ providers, handleLogin, loading, error, verify }) => {
  const [email, setEmail] = useState('');
  const { colorMode } = useColorMode();
  const mode = (lightValue, darkValue) => (colorMode == 'light' ? lightValue : darkValue);
  const emailButton = useRef();

  const getLogo = (provider) => {
    const logos = {
      email: <Email size="2em" />,
      google: <GoogleGLogo size="2em" />,
      github: <Github size="2em" />,
    };

    return logos[provider];
  };

  return (
    <VStack h="full" justifyContent="center" alignItems="center">
      <Box
        bg={mode('whiteAlpha.600', 'blackAlpha.700')}
        boxShadow={'lg'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
        pos="relative"
      >
        <OverlayFader active={loading} />
        <Heading color={mode('pink.500', 'pink.400')} size="xl" mb="0.5em">
          Sign in to your account...
        </Heading>
        <Box rounded={'lg'} width="full">
          <Stack width="full">
            {verify ? (
              <SignInMessage message="Please check your email to signin..." />
            ) : (
              <>
                {error && <SignInMessage error={error} />}
                <Stack alignItems="center" width="full">
                  {Object.values(providers).map((provider) => (
                    <Box key={provider.id} width="full">
                      {provider.id == 'email' ? (
                        <>
                          <Heading color={mode('pink.500', 'pink.400')} size="lg" mb="0.3em" mt="1em" textAlign="keft">
                            or use a magic link:
                          </Heading>
                          <InputGroup size="md">
                            <InputRightElement width="4em" overflow="hidden">
                              <Button
                                ref={emailButton}
                                variant="ghost"
                                key={provider.id}
                                type="button"
                                isLoading={loading}
                                _hover={{}}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleLogin(provider.id, email);
                                }}
                              >
                                Sign In
                              </Button>
                            </InputRightElement>
                            <FInputNoHook
                              autoFocus
                              fieldName={`title`}
                              label={''}
                              helper={'Please enter your email to receive a magic link for login'}
                              defaultValue={''}
                              placeholder="email"
                              error=""
                              invalid={false}
                              variant="solid"
                              //nav
                              disabled={loading}
                              color={mode('pink.500', 'pink.200')}
                              type="email"
                              onChange={(e) => setEmail(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  emailButton.current.click();
                                }
                              }}
                            />
                          </InputGroup>
                        </>
                      ) : (
                        <Button
                          colorScheme="gray"
                          width="full"
                          backgroundColor="white"
                          color="gray.600"
                          type="button"
                          variant="solid"
                          isLoading={loading}
                          _hover={{ bg: mode('pink.200', 'purple.200') }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleLogin(provider.id);
                          }}
                          leftIcon={getLogo(provider.id)}
                        >
                          <Text>Sign In with {provider.name}</Text>
                        </Button>
                      )}
                    </Box>
                  ))}
                </Stack>
              </>
            )}
          </Stack>
        </Box>
      </Box>
    </VStack>
  );
};
