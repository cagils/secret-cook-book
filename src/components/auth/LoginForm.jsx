import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import { SignIn } from '@styled-icons/octicons';

const errors = {
  Signin: 'Try signing with a different account.',
  OAuthSignin: 'Try signing with a different account.',
  OAuthCallback: 'Try signing with a different account.',
  OAuthCreateAccount: 'Try signing with a different account.',
  EmailCreateAccount: 'Try signing with a different account.',
  Callback: 'Try signing with a different account.',
  OAuthAccountNotLinked:
    'To confirm your identity, sign in with the same account you used originally.',
  EmailSignin: 'Check your email address.',
  CredentialsSignin:
    'Sign in failed. Check the details you provided are correct.',
  default: 'Unable to sign in.',
};

const SignInError = ({ error }) => {
  const errorMessage = error && (errors[error] ?? errors.default);
  return (
    <Alert status="error" variant="left-accent">
      <AlertIcon />
      {errorMessage}
    </Alert>
  );
};

export const LoginForm = ({ providers, handleLogin, loading, error }) => {
  // const [email, setEmail] = useState('');
  const { colorMode } = useColorMode();
  const mode = (lightValue, darkValue) =>
    colorMode == 'light' ? lightValue : darkValue;

  return (
    <VStack h="full" justifyContent="center" alignItems="center">
      <Box
        bg={mode('gray.50', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <Heading color={mode('pink.500', 'pink.400')} size="xl" mb="0.5em">
          Sign in to your account
        </Heading>
        <Box rounded={'lg'}>
          <Stack spacing={4}>
            <SignInError error={error} />
            <Box>
              {/* <FInputNoHook
                  autoFocus
                  fieldName={`title`}
                  label={''}
                  helper={
                    'Please enter your email to receive a magic link for login'
                  }
                  defaultValue={''}
                  placeholder="email"
                  error=""
                  invalid={false}
                  //nav
                  disabled={loading}
                  color={mode('pink.500', 'pink.200')}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                /> */}
            </Box>
            <Stack spacing={10} alignItems="center">
              {Object.values(providers).map((provider) => (
                <Button
                  key={provider.id}
                  // colorScheme="google"
                  type="button"
                  variant="solid"
                  isLoading={loading}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogin(provider.id);
                  }}
                  // leftIcon={<Google size="2em" />
                  leftIcon={<SignIn size="2em" />}
                >
                  <Text>Sign In with {provider.name}</Text>
                </Button>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Box>
    </VStack>
  );
};
