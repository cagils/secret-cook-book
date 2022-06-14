import {
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
      {!!error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
    </FormControl>
  );
};
