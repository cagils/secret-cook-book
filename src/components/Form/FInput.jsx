import {
  Editable,
  EditableInput,
  EditablePreview,
  Input,
} from '@chakra-ui/react';
import { useEffect } from 'react';
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
  const {
    handleSubmit,
    register,
    control,
    watch,
    reset,
    resetField,
    setValue,
    formState: { errors, isSubmitting },
  } = useFormContext();

  useEffect(() => {}, [fieldName, resetField, defaultValue]);

  const registerOptions = {
    ...rules,
    shouldUnregister: true,
  };
  const { onChange, onBlur, name, ref } = register(fieldName, registerOptions);

  return (
    <FormControlWrapper
      error={errors?.[fieldName]}
      fieldName={fieldName}
      label={label}
      helper={helper}
    >
      {type === 'editable' ? (
        <Editable
          // other parameters:
          defaultValue={defaultValue}
          placeholder={placeholder}
          startWithEditView={startWithEditView}
        >
          <EditablePreview />
          <EditableInput
            // register form hook methods:
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={onChange} // assign onChange event
            onBlur={onBlur} // assign onBlur event
            name={name} // assign name prop
            ref={ref} // assign ref prop
            {...rest}
          />
        </Editable>
      ) : (
        <Input
          // register form hook methods:
          onChange={onChange} // assign onChange event
          onBlur={onBlur} // assign onBlur event
          name={name} // assign name prop
          ref={ref} // assign ref prop
          // other parameters:
          defaultValue={defaultValue}
          placeholder={placeholder}
          height={10}
          {...rest}
        />
      )}
    </FormControlWrapper>
  );
};
