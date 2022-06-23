import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Input,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { FormControlWrapper } from './FormControlWrapper';

export const FInput = ({
  fieldName,
  rules,
  label,
  helper,
  defaultValue,
  placeholder,
  type = 'input',
  startWithEditView,
  ...rest
}) => {
  // Get form context:
  const formMethods = useFormContext();

  const {
    register,
    //unregister,
    //formState,
    //watch,
    //handleSubmit,
    //reset,
    //resetField,
    //setError,
    //clearErrors,
    //setValue,
    //setFocus,
    //getValues,
    getFieldState,
    //trigger,
    //control,
  } = formMethods;

  // const {
  //   isDirty,
  //   dirtyFields,
  //   touchedFields,
  //   isSubmitted,
  //   isSubmitSuccessful,
  //   isSubmitting,
  //   submitCount,
  //   isValid,
  //   isValidating,
  //   errors,
  // } = formState;

  const registerOptions = {
    ...rules,
    shouldUnregister: true,
  };

  return (
    <Box>
      <FormControlWrapper
        // errors={errors}
        fieldState={getFieldState(fieldName)}
        fieldName={fieldName}
        label={label}
        helper={helper}
      >
        {type === 'editable' ? (
          <Editable
            // other parameters:
            defaultValue={defaultValue}
            startWithEditView={startWithEditView}
            placeholder={placeholder}
          >
            <EditablePreview />
            <EditableInput
              // register form hook methods:
              // onChange={onChange} // assign onChange event
              // onBlur={onBlur} // assign onBlur event
              // name={name} // assign name prop
              // ref={ref} // assign ref prop
              {...register(fieldName, registerOptions)}
              // other parameters:
              placeholder={placeholder}
              {...rest}
            />
          </Editable>
        ) : (
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
        )}
      </FormControlWrapper>
    </Box>
  );
};
