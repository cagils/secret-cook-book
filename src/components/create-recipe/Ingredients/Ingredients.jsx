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
  Heading,
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
import React, { forwardRef, useEffect, useState } from 'react';
import {
  Controller,
  useController,
  useForm,
  useFormContext,
} from 'react-hook-form';

const FormControlWrapper = ({ children, errors, fieldName, label }) => {
  return (
    <FormControl isInvalid={errors[fieldName]}>
      {label && <FormLabel htmlFor={fieldName}>{label}</FormLabel>}
      {children}
      <FormErrorMessage>
        {errors?.[fieldName] && errors[fieldName].message}
      </FormErrorMessage>
    </FormControl>
  );
};

const FInput = ({ fieldName, rules, label, ...rest }) => {
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

const FSelect = ({ children, fieldName, rules, label, ...rest }) => {
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useFormContext();
  return (
    <FormControl isInvalid={errors[fieldName]}>
      {label && <FormLabel htmlFor={fieldName}>{label}</FormLabel>}
      <Select id={fieldName} {...register(fieldName, rules)} {...rest}>
        {children}
      </Select>
      <FormErrorMessage>
        {errors?.[fieldName] && errors[fieldName].message}
      </FormErrorMessage>
    </FormControl>
  );
};

const Ingredient = ({ fieldId, plus = false, desc }) => {
  return (
    <Box>
      <Flex grow="1" my={{ base: '4px', md: '6px' }}>
        <Flex grow="1" gap={{ base: '4px', md: '6px' }} wrap="wrap">
          <Box flexGrow="1">
            <FInput
              fieldName={`desc_${fieldId}`}
              minWidth={{ base: '100px', md: '300px' }}
              // isRequired
              variant="filled"
              placeholder="Item name"
              defaultValue={desc}
              rules={{ required: 'This is required' }}
            />
          </Box>
        </Flex>
        <Square>
          <IconButton
            flexBasis="1"
            isRound
            aria-label="Toggle Dark Mode"
            fontSize="1.2rem"
            variant="ghost"
            icon={<Icon as={plus ? PlusSquare : MinusSquare} />}
          />
        </Square>
      </Flex>
    </Box>
  );
};

const Ingredients = () => {
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
      const data = await response.json();
      setRecipe(data.data);
      setLoading(false);
    };

    loadRecipe();
  }, []);

  return (
    <Box>
      <Container>
        <Box>{!recipe || (isLoading && 'is loading...')}</Box>
      </Container>
      <Box>Ingredients</Box>
      {recipe && (
        <Box m="8px" justify="center" align="center" grow="1">
          <Box maxWidth="1200px" justify="center" align="center">
            <Box>
              {Object.entries(recipe.ingredients).map(([category, ingList]) => {
                return (
                  <Box key={category} align="left" mt="20px">
                    {category && <Heading size="md">{category}</Heading>}
                    {ingList.map((ing, i) => (
                      <Ingredient key={i} fieldId={i} desc={ing} />
                    ))}
                  </Box>
                );
              })}
              <Ingredient fieldId={4} plus />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Ingredients;
