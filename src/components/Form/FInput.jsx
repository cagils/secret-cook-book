import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { getCircularReplacer } from '../../lib/tools';
import { FormControlWrapper } from './FormControlWrapper';

export const FInput = ({
  fieldName,
  rules,
  label,
  helper,
  defaultValue,
  placeholder,
  ...rest
}) => {
  /* const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useFormContext(); */

  const {
    field: { onChange, onBlur, value, name, ref },
    fieldState: { invalid, isTouched, isDirty, error },
    formState: {
      // isDirty,
      // touchedFields,
      // dirtyFields,
      // isSubmitted,
      // isSubmitSuccessful,
      // isSubmitting,
      // submitCount,
      // isValid,
      // isValidating,
      errors,
    },
  } = useController({
    name: fieldName,
    rules,
    defaultValue,
    shouldUnregister: true,
  });
  return (
    <FormControlWrapper
      error={error}
      fieldName={fieldName}
      label={label}
      helper={helper}
    >
      <Input
        id={fieldName}
        onChange={onChange} // send value to hook form
        onBlur={onBlur} // notify when input is touched/blur
        placeholder={placeholder}
        value={value} // input value
        name={fieldName} // send down the input name
        ref={ref} // send input ref, so we can focus on input when error appear
        height={10}
        {...rest}
      />
    </FormControlWrapper>
  );
};
