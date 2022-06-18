import {
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
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const registerOptions = {
    ...rules,
    shouldUnregister: true,
  };
  const { onChange, onBlur, name, ref } = register(fieldName, registerOptions);

  return (
    <FormControlWrapper
      errors={errors}
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
            onChange={onChange} // assign onChange event
            onBlur={onBlur} // assign onBlur event
            name={name} // assign name prop
            ref={ref} // assign ref prop
            placeholder={placeholder}
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
          {...rest}
        />
      )}
    </FormControlWrapper>
  );
};
