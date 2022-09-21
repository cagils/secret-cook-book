import { Text, useColorMode } from '@chakra-ui/react';

export const SCBText = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === 'dark';
  const mode = (lightValue, darkValue) => (colorMode == 'light' ? lightValue : darkValue);

  return (
    <Text
      textAlign="center"
      //fontFamily="heading"
      fontSize={{
        base: '1em',
        sm: '1.1em',
        md: '1.2em',
        lg: '1.4em',
        xl: '1.8em',
      }}
      color={mode('pink.500', 'pink.200')}
      letterSpacing="wide"
      fontWeight="medium"
    >
      {children}
    </Text>
  );
};
