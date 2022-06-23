import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

export const RecipeCard = ({ recipe }) => (
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
            bg={useColorModeValue('purple.200', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'md'}
            p={6}
            overflow={'hidden'}
          >
            <Box
              h={'210px'}
              bg={'purple.400'}
              mt={-6}
              mx={-6}
              mb={6}
              pos={'relative'}
            >
              <Image
                src={`https://images.unsplash.com/photo-1636839825921-bc1a9cce1eab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`}
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
                color={'pink.500'}
                fontWeight={800}
                fontSize={'sm'}
                letterSpacing={1.1}
                textTransform="uppercase"
              >
                <Flex gap="1rem">
                  <Text>Serving: {recipe.serving}</Text>
                  <Text>Time: {recipe.time}</Text>
                </Flex>
              </Text>
              <Heading
                color={useColorModeValue('pink.700', 'pink.200')}
                fontSize={'2xl'}
                fontFamily={'body'}
                as="h3"
              >
                {recipe.title}
              </Heading>
              <Text
                color={useColorModeValue('gray.800', 'gray.400')}
                fontFamily="Quicksand"
                fontWeight="medium"
              >
                {recipe.shortDesc}
              </Text>
            </Stack>
            <Stack
              color={'pink.500'}
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
              <Text
                pt={'8px'}
                color={useColorModeValue('gray.500', 'gray.500')}
              >
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
