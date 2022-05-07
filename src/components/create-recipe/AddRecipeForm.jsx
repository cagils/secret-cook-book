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
import {
  Controller,
  useController,
  useForm,
  useFormContext,
} from 'react-hook-form';
import Ingredients from './Ingredients/Ingredients';

const AddRecipeForm = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === 'dark';
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useFormContext();

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

  return (
    <form onSubmit={handleSubmit(onFormSubmit, onFormError)}>
      <Ingredients />

      <Box my="8px" align="end">
        <Button
          type="submit"
          color="white"
          variant="gradient"
          bgGradient="linear(to-r, purple.300, pink.300)"
          isLoading={isSubmitting}
        >
          Save Recipe
        </Button>
      </Box>
      <IconButton
        variant="outline"
        color={dark ? 'yellow' : 'blue'}
        onClick={() => toggleColorMode()}
        aria-label="Toggle color scheme"
        icon={<Icon as={dark ? Sun : Moon} />}
      />
    </form>
  );
};

export default AddRecipeForm;
