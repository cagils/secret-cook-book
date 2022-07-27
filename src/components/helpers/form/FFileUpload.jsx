import { Box, useColorMode } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { FileUpload } from '@/components/helpers/form/FileUpload';
import { FormControlWrapper } from '@/components/helpers/form/FormControlWrapper';

export const FFileUpload = ({
  fieldName,
  rules,
  label,
  helper,
  defaultValue,
  placeholder,
  acceptedFileTypes,
  ...rest
}) => {
  const { colorMode } = useColorMode();
  const mode = (lightValue, darkValue) =>
    colorMode == 'light' ? lightValue : darkValue;

  const formMethods = useFormContext();

  const {
    register,
    unregister,
    formState,
    watch,
    handleSubmit,
    reset,
    resetField,
    setError,
    clearErrors,
    setValue,
    setFocus,
    getValues,
    getFieldState,
    trigger,
    control,
  } = formMethods;

  // it is important to destruct this fully even if it is not used here (registration is important)
  const {
    isDirty,
    dirtyFields,
    touchedFields,
    isSubmitted,
    isSubmitSuccessful,
    isSubmitting,
    submitCount,
    isValid,
    isValidating,
    errors,
  } = formState;

  const registerOptions = {
    ...rules,
    shouldUnregister: true,
  };

  return (
    <Box width="full">
      <FormControlWrapper
        // errors={errors}
        fieldState={getFieldState(fieldName)}
        fieldName={fieldName}
        label={label}
        helper={helper}
        borderColor={mode('blackAlpha.300', 'whiteAlpha.300')}
      >
        {/* {type === 'input' && (
          <Input
            // register form hook methods:
            // onChange={onChange} // assign onChange event
            // onBlur={onBlur} // assign onBlur event
            // name={name} // assign name prop
            // ref={ref} // assign ref prop
            {...register(fieldName, registerOptions)}
            // other parameters:
            defaultValue={defaultValue}
            placeholder={placeholder}
            {...rest}
          />
        )} */}
        <FileUpload
          name={fieldName}
          acceptedFileTypes={acceptedFileTypes}
          isRequired={true}
          control={control}
          defaultValue={defaultValue}
          placeholder={placeholder}
          {...rest}
        >
          New avatar
        </FileUpload>
      </FormControlWrapper>
    </Box>
  );
};
