import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import React from 'react';

export const FormControlWrapper = ({ children, errors, fieldName, label }) => {
  return (
    <FormControl isInvalid={errors[fieldName]}>
      {label && <FormLabel htmlFor={fieldName}>{label}</FormLabel>}
      {children}
      <FormErrorMessage>
        {errors?.[fieldName] && errors[fieldName].message}
      </FormErrorMessage>
    </FormControl>
  );
};
