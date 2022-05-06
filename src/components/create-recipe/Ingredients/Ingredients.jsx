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
import { useController, useForm } from 'react-hook-form';

function CInput({ hookProps }) {
  const { field, fieldState, formState } = useController(hookProps);

  return <Input {...field} />;
}

const Ingredient = ({ plus = false, title, qty, unit = 'gr' }) => {
  return (
    <Box>
      <Flex grow="1" my={{ base: '4px', md: '6px' }}>
        <Flex grow="1" gap={{ base: '4px', md: '6px' }} wrap="wrap">
          <Input
            id="1"
            minWidth={{ base: '100px', md: '300px' }}
            flexBasis="300px"
            flexGrow="2"
            //isRequired
            variant="filled"
            placeholder="Item name"
            //value={title}
            // onChange={() => null}
          />
          <Flex gap={{ base: '4px', md: '6px' }}>
            <Input
              id="2"
              minWidth={{ base: '100px', md: '150px' }}
              flexBasis="150px"
              flexGrow="1"
              //isRequired
              variant="filled"
              placeholder="qty"
              //value={qty}
              // onChange={() => null}
              textAlign="end"
            />

            <Select
              id="3"
              minWidth={{ base: '100px', md: '150px' }}
              flexBasis="150px"
              flexGrow="1"
              //isRequired
              variant="filled"
              //value={unit}
              // onChange={() => null}
            >
              <option value="gr">gr.</option>
              <option value="tbsp">tbsp.</option>
              <option value="tsp">tsp.</option>
              <option value="pinch">pinch</option>
            </Select>
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
  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === 'dark';
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name}>
        <Box>
          <Box>Ingredients</Box>
          <Box m="8px" justify="center" align="center" grow="1">
            <Box maxWidth="1200px" justify="center" align="center">
              <Box>
                <Ingredient
                  title="Beef"
                  qty={250}
                  unit="gr"
                  {...register('a', {
                    required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                  })}
                />
                <Ingredient title="Rice" qty={150} unit="gr" />
                <Ingredient title="Salt" qty={2} unit="pinch" />
                <Ingredient plus />
              </Box>
              <Box my="8px" align="end">
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
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
            </Box>
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
        </Box>
      </FormControl>
    </form>
  );
};

export default Ingredients;
