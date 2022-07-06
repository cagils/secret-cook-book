import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';

import { useState } from 'react';
import { FInput } from '../helpers/form/FInput';
import { FInputNoHook } from '../helpers/form/FInputNoHook';

export const LoginForm = ({ handleLogin, loading }) => {
  const [email, setEmail] = useState('');
  const { colorMode } = useColorMode();
  const mode = (lightValue, darkValue) =>
    colorMode == 'light' ? lightValue : darkValue;

  return (
    <VStack h="full" justify="center" align="center">
      <Box
        bg={mode('gray.50', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(email);
          }}
        >
          <Heading color={mode('pink.500', 'pink.400')} size="xl" mb="0.5em">
            Sign in to your account
          </Heading>
          <Box rounded={'lg'}>
            <Stack spacing={4}>
              <Box>
                <FInputNoHook
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
                />
              </Box>
              <Stack spacing={10}>
                <Button type="submit" isLoading={loading}>
                  <span>{loading ? 'Loading' : 'Send magic link'}</span>
                </Button>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Box>
    </VStack>
  );
};
