import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export const FSelect = ({ children, fieldName, rules, label, ...rest }) => {
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useFormContext();
  return (
    <FormControl isInvalid={errors[fieldName]}>
      {label && <FormLabel htmlFor={fieldName}>{label}</FormLabel>}
      <Select id={fieldName} {...register(fieldName, rules)} {...rest}>
        {children}
      </Select>
      <FormErrorMessage>
        {errors?.[fieldName] && errors[fieldName].message}
      </FormErrorMessage>
    </FormControl>
  );
};
