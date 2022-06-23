import {
  Box,
  Container,
  Heading,
  Icon,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import { Moon, Sun } from '@styled-icons/feather';
import { enableAllPlugins } from 'immer';
import Link from 'next/link';
import { Recipes } from '../../components/recipe/Recipes';
import { Layout } from '../../layouts/Layout';

enableAllPlugins();

export default function RecipesPage() {
  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === 'dark';

  return <Recipes />;
}

RecipesPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
