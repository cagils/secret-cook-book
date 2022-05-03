import {
  Button,
  ButtonGroup,
  Icon,
  IconButton,
  Input,
  Select,
  useColorMode,
} from '@chakra-ui/react';
import { MinusSquare, Moon, PlusSquare, Sun } from '@emotion-icons/feather';
import Link from 'next/link';
import { useState } from 'react';

const Ingredient = ({ plus = false, name, qty, unit }) => {
  return (
    <>
      <Input placeholder="Item name" value={name} onChange={() => null} />

      <Input placeholder="qty" value={qty} onChange={() => null} />

      <Select placeholder="unit" value={unit} onChange={() => null}>
        <option value="gr">gr.</option>
        <option value="tbsp">tbsp.</option>
        <option value="tsp">tsp.</option>
        <option value="pinch">pinch</option>
      </Select>

      <IconButton
        size="lg"
        aria-label="Toggle Dark Mode"
        fontSzie="20px"
        icon={<Icon as={plus ? PlusSquare : MinusSquare} />}
      />
    </>
  );
};

const Ingredients = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === 'dark';

  return (
    <div>
      <div>Ingredients</div>
      <Ingredient name="Beef" qty={250} unit="gr" />
      <Ingredient name="Rice" qty={150} unit="gr" />
      <Ingredient name="Salt" qty={2} unit="pinch" />
      <Ingredient plus />
      <Button
        onClick={() => toggleColorMode()}
        variant="gradient"
        bgGradient="linear(to-r, green.200, pink.500)"
      >
        Save Recipe
      </Button>
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
    </div>
  );
};

export default Ingredients;
