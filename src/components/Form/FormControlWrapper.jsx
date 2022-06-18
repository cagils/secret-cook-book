import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';
// import { ErrorMessage } from '@hookform/error-message';
// import { get } from 'react-hook-form';

export const FormControlWrapper = ({
  children,
  // errors,
  fieldName,
  label,
  helper,
  fieldState,
}) => {
  // const error = get(errors, fieldName);
  return (
    <FormControl isInvalid={fieldState.invalid}>
      {!!label && <FormLabel htmlFor={fieldName}>{label}</FormLabel>}
      {children}
      {!!helper && <FormHelperText>{helper}</FormHelperText>}
      {!!fieldState.error && (
        <FormErrorMessage mb={2}>{fieldState.error.message}</FormErrorMessage>
      )}
    </FormControl>
  );
};
