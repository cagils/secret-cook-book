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
import React, { forwardRef, useState } from 'react';
import {
  Controller,
  useController,
  useForm,
  useFormContext,
} from 'react-hook-form';

const FormControlWrapper = ({ children, fieldName, rules, label, ...rest }) => {
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
      {/* <Input id={fieldName} {...register(fieldName, rules)} {...rest} /> */}
      {React.cloneElement(children, {
        id: fieldName,
        // ...register(fieldName, rules),
        ...rest,
      })}
      <FormErrorMessage>
        {errors?.[fieldName] && errors[fieldName].message}
      </FormErrorMessage>
    </FormControl>
  );
};

const FInput = ({ fieldName, rules, label, ...rest }) => {
  return (
    <FormControlWrapper>
      <Input />
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

const Ingredient = ({ fieldId, plus = false, title, qty, unit = 'gr' }) => {
  return (
    <Box>
      <Flex grow="1" my={{ base: '4px', md: '6px' }}>
        <Flex grow="1" gap={{ base: '4px', md: '6px' }} wrap="wrap">
          <Box flexBasis="300px" flexGrow="2">
            <FInput
              fieldName={`title_${fieldId}`}
              minWidth={{ base: '100px', md: '300px' }}
              // isRequired
              variant="filled"
              placeholder="Item name"
              defaultValue={title}
              rules={{ required: 'This is required' }}
            />
          </Box>
          <Flex gap={{ base: '4px', md: '6px' }}>
            <Box flexBasis="150px" flexGrow="1">
              <FInput
                fieldName={`qty_${fieldId}`}
                minWidth={{ base: '100px', md: '150px' }}
                // isRequired
                variant="filled"
                placeholder="qty"
                defaultValue={qty}
                textAlign="end"
                rules={{ required: 'This is required' }}
              />
            </Box>
            <Box flexBasis="150px" flexGrow="1">
              <FSelect
                fieldName={`unit_${fieldId}`}
                minWidth={{ base: '100px', md: '150px' }}
                // isRequired
                // placeholder="select unit"
                variant="filled"
                defaultValue={unit}
                rules={{ required: 'This is required' }}
              >
                <option value="gr">gr.</option>
                <option value="tbsp">tbsp.</option>
                <option value="tsp">tsp.</option>
                <option value="pinch">pinch</option>
              </FSelect>
            </Box>
          </Flex>
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
  return (
    <Box>
      <Box>Ingredients</Box>
      <Box m="8px" justify="center" align="center" grow="1">
        <Box maxWidth="1200px" justify="center" align="center">
          <Box>
            <Ingredient fieldId={1} title="Beef" qty={250} unit="gr" />
            <Ingredient fieldId={2} title="Rice" qty={150} unit="gr" />
            <Ingredient fieldId={3} title="Salt" qty={2} unit="pinch" />
            <Ingredient fieldId={4} plus />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Ingredients;
