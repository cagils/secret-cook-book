import { Heading, useColorMode } from '@chakra-ui/react';

export const SCBHeading = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === 'dark';
  const mode = (lightValue, darkValue) =>
    colorMode == 'light' ? lightValue : darkValue;

  return (
    <Heading
      as="h2"
      textAlign="center"
      fontFamily="heading"
      fontSize={{
        base: '1.5em',
        sm: '2em',
        md: '2.5em',
        lg: '2.5em',
        xl: '3em',
      }}
      color={mode('pink.500', 'pink.200')}
      letterSpacing="wide"
      fontWeight="bold"
      textDecoration="underline"
      textUnderlineOffset={'0.05em'}
      textDecorationThickness="2px"
      textDecorationColor={mode('purple.300', 'purple.400')}
      // fontStyle="italic"
      //textTransform={'capitalize'}
    >
      {children}
    </Heading>
  );
};
