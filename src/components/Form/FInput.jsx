import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { FormControlWrapper } from './FormControlWrapper';

export const FInput = ({ fieldName, rules, label, leftElement, ...rest }) => {
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

/* function Input({ control, name }) {
  const {
    field: { onChange, onBlur, name, value, ref },
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields }
  } = useController({
    name,
    control,
    rules,
    defaultValue: "",
  });

  return (
    <TextField 
      onChange={onChange} // send value to hook form 
      onBlur={onBlur} // notify when input is touched/blur
      value={value} // input value
      name={name} // send down the input name
      inputRef={ref} // send input ref, so we can focus on input when error appear
    />
  ); */
