import { MinusSquare, Moon, PlusSquare, Sun } from '@emotion-icons/feather';
import {
  ActionIcon,
  Box,
  Button,
  Container,
  createStyles,
  Grid,
  Group,
  Select,
  TextInput,
  useMantineColorScheme,
} from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    // subscribe to color scheme changes right in your styles
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.blue[5] : theme.colors.red[1],
    borderRadius: theme.radius.sm,
  },
}));

const Ingredient = ({ plus = false, name, qty, unit }) => {
  const { classes } = useStyles();

  return (
    <Group
      my="xs"
      direction="row"
      align="center"
      grow={false}
      noWrap
      position="center"
      spacing="xs"
    >
      <Box sx={{ flex: 5, minWidth: '200px' }}>
        <TextInput
          placeholder="Item name"
          // label="Full name"
          // description="desc"
          // error="error"
          // radius="lg"
          value={name}
          required
          styles={{
            input: { textAlign: 'start' },
          }}
        />
      </Box>
      <Box sx={{ flex: 2, minWidth: '100px' }}>
        <TextInput
          placeholder="qty"
          // label="Full name"
          // description="desc"
          // error="error"
          // radius="lg"
          value={qty}
          required
          styles={{
            input: { textAlign: 'end' },
          }}
        />
      </Box>
      <Box
        sx={(t) => ({
          flex: 2,
          minWidth: 100,
        })}
      >
        <Select
          // radius="lg"
          // md="xs"
          // label=""
          placeholder="unit"
          value={unit}
          required
          data={[
            { value: 'gr', label: 'gr.' },
            { value: 'tbsp', label: 'tbsp.' },
            { value: 'tsp', label: 'tsp.' },
            { value: 'pinch', label: 'pinch' },
          ]}
        />
      </Box>
      <Box>
        <ActionIcon size="lg" variant="transparent" color="brandA" title="add">
          {plus ? <PlusSquare size={24} /> : <MinusSquare size={24} />}
        </ActionIcon>
      </Box>
    </Group>
  );
};

const Ingredients = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <div>
      <div>Ingredients</div>
      <Ingredient name="Beef" qty={250} unit="gr" />
      <Ingredient name="Rice" qty={150} unit="gr" />
      <Ingredient name="Salt" qty={2} unit="pinch" />
      <Ingredient plus />
      <Button
        onClick={() => toggleColorScheme()}
        variant="gradient"
        gradient={{ from: '#F36898', to: '#AE9EEB', deg: 60 }}
      >
        Save Recipe
      </Button>
      <Group mt="xl">
        <Button
          onClick={() => toggleColorScheme()}
          variant="gradient"
          gradient={{ from: 'teal', to: 'blue', deg: 60 }}
        >
          Toggle Theme
        </Button>
        <ActionIcon
          variant="outline"
          color={dark ? 'yellow' : 'blue'}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </ActionIcon>
      </Group>
    </div>
  );
};

export default Ingredients;
