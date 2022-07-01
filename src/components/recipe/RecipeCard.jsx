import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

export const RecipeCard = ({ recipe }) => {
  const { colorMode } = useColorMode();
  const mode = (lightValue, darkValue) =>
    colorMode == 'light' ? lightValue : darkValue;

  return (
    <Box>
      <Link
        href={{
          pathname: '/my/recipes/[recipeId]',
          query: { recipeId: recipe.recipeId },
        }}
      >
        <a>
          <Center py={6}>
            <Box
              maxW="30rem"
              w={'full'}
              bg={mode('gray.50', 'gray.900')}
              boxShadow={'2xl'}
              rounded={'md'}
              p={6}
              overflow={'hidden'}
            >
              <Box
                h={'210px'}
                //bg={'purple.400'}
                mt={-6}
                mx={-6}
                mb={6}
                pos={'relative'}
              >
                <Image
                  src={recipe.photo}
                  alt={'Recipe Photo'}
                  // width={1170}
                  // height={780}
                  layout={'fill'}
                  objectFit={'cover'}
                  objectPosition={'50% 50%'}
                />
              </Box>
              <Stack>
                <Text
                  color={mode('pink.500', 'pink.400')}
                  fontWeight={600}
                  fontSize={'sm'}
                  letterSpacing={1.4}
                  textTransform="uppercase"
                >
                  <Flex>
                    <Text>Serving: {recipe.serving}</Text>
                    <Text>Time: {recipe.time}</Text>
                  </Flex>
                </Text>
                <Heading
                  color={mode('pink.700', 'pink.200')}
                  fontSize={'2xl'}
                  fontFamily={'body'}
                  as="h3"
                >
                  {recipe.title}
                </Heading>
                <Text
                  color={mode('gray.800', 'gray.400')}
                  fontFamily="Quicksand"
                  fontWeight="medium"
                >
                  {recipe.shortDesc}
                </Text>
              </Stack>
              <Stack
                color={mode('pink.500', 'pink.400')}
                mt={6}
                direction={'column'}
                spacing={0}
                fontSize={'sm'}
              >
                <Text fontWeight={'bold'}>Difficulty: {recipe.difficulty}</Text>
                <Stack direction={'row'}>
                  <Text fontWeight={'bold'}>Ingredients: </Text>
                  <Text fontWeight={'medium'}>
                    {recipe.ingredients.map(
                      (g) => `${g.groupName}: ` + g.list.length + ' '
                    )}
                  </Text>
                </Stack>
                <Text pt={'8px'} color={mode('gray.500', 'gray.500')}>
                  TODO: Feb 08, 2021 · 6min read
                </Text>
              </Stack>
            </Box>
          </Center>
        </a>
      </Link>
      <hr />
    </Box>
  );
};
