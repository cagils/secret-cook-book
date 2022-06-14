import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';
import React from 'react';

export const FormControlWrapper = ({
  children,
  error,
  fieldName,
  label,
  helper,
}) => {
  return (
    <FormControl isInvalid={error}>
      {!!label && <FormLabel htmlFor={fieldName}>{label}</FormLabel>}
      {children}
      {!!helper && <FormHelperText>{helper}</FormHelperText>}
      {!!error && <FormErrorMessage mb={2}>{error?.message}</FormErrorMessage>}
    </FormControl>
  );
};
