import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';

export const FormControlWrapper = ({
  children,
  // errors,
  fieldName,
  label,
  helper,
  fieldState,
  ...rest
}) => {
  // const error = get(errors, fieldName);
  return (
    <FormControl isInvalid={fieldState.invalid} {...rest}>
      {!!label && <FormLabel htmlFor={fieldName}>{label}</FormLabel>}
      {children}
      {!!helper && <FormHelperText>{helper}</FormHelperText>}
      {!!fieldState.error && (
        <FormErrorMessage mb={2}>{fieldState.error.message}</FormErrorMessage>
      )}
    </FormControl>
  );
};
