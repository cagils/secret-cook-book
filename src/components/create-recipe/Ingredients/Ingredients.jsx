import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Circle,
  Container,
  Flex,
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
import { useState } from 'react';

const Ingredient = ({ plus = false, name, qty, unit = 'gr' }) => {
  return (
    <Box>
      <Flex grow="1" my={{ base: '4px', md: '6px' }}>
        <Flex grow="1" gap={{ base: '4px', md: '6px' }} wrap="wrap">
          <Input
            minWidth={{ base: '100px', md: '300px' }}
            flexBasis="300px"
            flexGrow="2"
            isRequired
            variant="filled"
            placeholder="Item name"
            value={name}
            onChange={() => null}
          />
          <Flex gap={{ base: '4px', md: '6px' }}>
            <Input
              minWidth={{ base: '100px', md: '150px' }}
              flexBasis="150px"
              flexGrow="1"
              isRequired
              variant="filled"
              placeholder="qty"
              value={qty}
              onChange={() => null}
              textAlign="end"
            />
            <Select
              minWidth={{ base: '100px', md: '150px' }}
              flexBasis="150px"
              flexGrow="1"
              isRequired
              variant="filled"
              value={unit}
              onChange={() => null}
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

  return (
    <Box>
      <Box>Ingredients</Box>
      <Box m="8px" justify="center" align="center" grow="1">
        <Box maxWidth="1200px" justify="center" align="center">
          <Box>
            <Ingredient name="Beef" qty={250} unit="gr" />
            <Ingredient name="Rice" qty={150} unit="gr" />
            <Ingredient name="Salt" qty={2} unit="pinch" />
            <Ingredient plus />
          </Box>
          <Box my="8px" align="end">
            <Button
              color="white"
              onClick={() => null}
              variant="gradient"
              bgGradient="linear(to-r, purple.300, pink.300)"
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
  );
};

export default Ingredients;
