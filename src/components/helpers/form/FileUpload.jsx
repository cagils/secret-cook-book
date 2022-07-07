import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { File } from '@styled-icons/feather';
import { useRef } from 'react';
import { useController } from 'react-hook-form';

export const FileUpload = ({
  name,
  placeholder,
  defaultValue,
  acceptedFileTypes,
  control,
  isRequired = false,
  ...rest
}) => {
  const inputRef = useRef();
  const {
    field: { ref, onChange, value, ...inputProps },
    fieldState: { invalid, isTouched, isDirty },
  } = useController({
    name,
    control,
    rules: { required: isRequired },
  });

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <Icon as={File} />
      </InputLeftElement>
      <input
        type="file"
        onChange={(e) => onChange(e.target.files[0])}
        accept={acceptedFileTypes}
        name={name}
        ref={inputRef}
        {...inputProps}
        style={{ display: 'none' }}
      />
      <Input
        value={(value && value.name) || ''}
        onClick={() => inputRef.current.click()}
        //
        placeholder={placeholder}
        defaultValue={defaultValue}
        // readOnly={true}
        {...rest}
      />
    </InputGroup>
  );
};

FileUpload.defaultProps = {
  acceptedFileTypes: '',
  allowMultipleFiles: false,
};
