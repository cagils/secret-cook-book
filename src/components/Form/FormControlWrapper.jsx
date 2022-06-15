import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import { get } from 'react-hook-form';

export const FormControlWrapper = ({
  children,
  errors,
  fieldName,
  label,
  helper,
}) => {
  const error = get(errors, fieldName);
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={fieldName}>{label}</FormLabel>}
      {children}
      {!!helper && <FormHelperText>{helper}</FormHelperText>}
      {!!error && <FormErrorMessage mb={2}>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};
