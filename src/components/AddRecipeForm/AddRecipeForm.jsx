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
  Spinner,
  Square,
  Stack,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import { MinusSquare, Moon, PlusSquare, Sun } from '@styled-icons/feather';
import Link from 'next/link';
import { forwardRef, useEffect, useState } from 'react';
import {
  Controller,
  useController,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { getCircularReplacer } from '../../lib/tools.js';
import Ingredients from '../Ingredients/Ingredients';

const AddRecipeForm = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === 'dark';
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useFormContext();

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

  const [recipe, setRecipe] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const recipeId = 'scb0001';

  useEffect(() => {
    const loadRecipe = async () => {
      setLoading(true);
      const response = await fetch(`/api/recipes/${recipeId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      let data = await response.json();
      data = data.data[0];
      setRecipe(data);
      setLoading(false);
    };

    loadRecipe();
  }, []);

  if (!recipe) {
    return <Spinner />;
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit, onFormError)}>
      <Box as="h1">{recipe.title}</Box>
      {recipe && <Ingredients ingredients={recipe.ingredients} />}

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
