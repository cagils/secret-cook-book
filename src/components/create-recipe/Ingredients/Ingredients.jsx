import { ActionIcon, Button, useMantineColorScheme } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import { MoonStars, Sun } from 'tabler-icons-react';
import TestComp from '../../test-comp';
//import styles from './Ingredients.module.css';

const Ingredients = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <div>
      <form
        className="flex flex-col items-center gap-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          alert(searchTerm);
        }}
      >
        <input
          type="text"
          className="rounded-full border-2 w-5/6 sm:w-96 h-12 px-3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="space-x-3">
          <button type="submit" className="btn-primary">
            Google Search
          </button>
          <button type="submit" className="btn-primary">
            I&apos;m Feeling Lucky
          </button>
        </div>
      </form>
      <TestComp></TestComp>
      <Button onClick={() => toggleColorScheme()}>Toggle Theme</Button>
      <ActionIcon variant="outline" color={dark ? 'yellow' : 'blue'} onClick={() => toggleColorScheme()} title="Toggle color scheme">
        {dark ? <Sun size={18} /> : <MoonStars size={18} />}
      </ActionIcon>
    </div>
  );
};

export default Ingredients;
