import { Box, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, useColorMode } from '@chakra-ui/react';

export const FInputNoHook = ({ fieldName, label, helper, defaultValue, placeholder, error, invalid, ...rest }) => {
  const { colorMode } = useColorMode();
  const mode = (lightValue, darkValue) => (colorMode == 'light' ? lightValue : darkValue);

  return (
    <Box width="full">
      <FormControl isInvalid={invalid} borderColor={mode('blackAlpha.300', 'whiteAlpha.300')}>
        {!!label && <FormLabel htmlFor={fieldName}>{label}</FormLabel>}
        <Input defaultValue={defaultValue} placeholder={placeholder} {...rest} />
        {!!helper && <FormHelperText>{helper}</FormHelperText>}
        {error && <FormErrorMessage mb={2}>{error}</FormErrorMessage>}
      </FormControl>
    </Box>
  );
};
