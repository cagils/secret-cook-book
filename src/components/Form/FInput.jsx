import { Input } from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControlWrapper } from './FormControlWrapper';

export const FInput = ({ fieldName, rules, label, ...rest }) => {
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useFormContext();
  return (
    <FormControlWrapper errors={errors} fieldName={fieldName} label={label}>
      <Input id={fieldName} {...register(fieldName, rules)} {...rest} />
    </FormControlWrapper>
  );
};
