import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Circle,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  Select,
  Spacer,
  Square,
  Stack,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import { MinusSquare, Moon, PlusSquare, Sun } from '@styled-icons/feather';
import Link from 'next/link';
import { forwardRef, useState } from 'react';
import { Controller, useController, useForm } from 'react-hook-form';
import Ingredients from './Ingredients/Ingredients';

function CInput({ hookProps }) {
  const { field, fieldState, formState } = useController(hookProps);

  return <Input {...field} />;
}

const AddRecipeForm = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === 'dark';
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
  });

  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

  function onFormError(data) {
    const name = Object.keys(data)[0];
    data = data[name];
    delete data.ref;
    alert(`${name}: ` + JSON.stringify(data, getCircularReplacer()));
  }

  function onFormSubmit(data) {
    const name = Object.keys(data)[0];
    data = data[name];
    delete data.ref;
    alert(`${name}: ` + JSON.stringify(data, getCircularReplacer()));
  }

  const nameRules = {
    required: 'this is required',
    minLength: 3,
    maxLength: 5,
    type: 'text',
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit, onFormError)}>
      <input name="inputx" {...register('inputx', nameRules)} />
      {errors?.inputx && errors.inputx.message}
      <Input name="inputnative" {...register('inputnative', nameRules)} />
      {errors?.inputnative && errors.inputnative.message}
      <Controller
        name="role"
        control={control}
        defaultValue=""
        rules={{ required: 'This select is required' }}
        render={({ field }) => (
          <Select {...field}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        )}
      />
      <small className="text-danger">
        {errors?.role && errors.role.message}
      </small>
      <Ingredients isSubmitting={isSubmitting} />
      <Box my="8px" align="end">
        <Button
          color="white"
          variant="gradient"
          bgGradient="linear(to-r, purple.300, pink.300)"
          type="submit"
          isLoading={isSubmitting}
        >
          Save Recipe
        </Button>
      </Box>
      <Button
        onClick={() => toggleColorMode()}
        variant="gradient"
        gradient={{ from: 'teal', to: 'blue', deg: 60 }}
      >
        Toggle Theme
      </Button>
      <IconButton
        variant="outline"
        color={dark ? 'yellow' : 'blue'}
        onClick={() => toggleColorMode()}
        aria-label="Toggle color scheme"
        icon={<Icon as={dark ? Sun : Moon} />}
      />
      <FormControl isInvalid={errors.name}></FormControl>
    </form>
  );
};

export default AddRecipeForm;
