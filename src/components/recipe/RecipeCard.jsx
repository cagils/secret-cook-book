import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import Link from 'next/link';

export const RecipeCard = ({ recipe }) => {
  const { colorMode } = useColorMode();
  const mode = (lightValue, darkValue) =>
    colorMode == 'light' ? lightValue : darkValue;

  return (
    <Box
      overflow="hidden"
      rounded="lg"
      textAlign="start"
      alignSelf="stretch"
      justifySelf="stretch"
      height="full"
      // border="1px solid orange"
      bg={mode('gray.50', 'gray.900')}
      boxShadow={mode('base', 'baseWhite')}
      // rounded={'md'}
      p={6}
    >
      <Link
        href={{
          pathname: '/my/recipes/[recipeId]',
          query: { recipeId: recipe.recipeId },
        }}
      >
        <a>
          <Box
          // height="30em"
          >
            <Box
              // height="20em"
              // h={'210px'}
              //bg={'purple.400'}
              mt={-6}
              mx={-6}
              mb={6}
              pos={'relative'}
              overflow="hidden"
            >
              {/* <NextImage
                  src={recipe.photo}
                  alt={'Recipe Photo'}
                  // width={1170}
                  // height={780}
                  layout={'fill'}
                  objectFit={'cover'}
                  objectPosition={'50% 50%'}
                /> */}
              <Image
                src={recipe?.photo}
                alt={'Recipe Photo'}
                layout="fill"
                objectFit="cover"
                //width="100%"
                //height="40vh"
                //minH="20rem"
                //maxH="30rem"
                //htmlHeight="100%"
                //htmlWidth="100%"
                // objectPosition={'50% 50%'}
                sx={{
                  aspectRatio: '16 / 9',
                }}
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
                overflow="hidden"
                color={mode('gray.800', 'gray.400')}
                fontFamily="quote"
                fontWeight="medium"
                noOfLines={4}
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
        </a>
      </Link>
    </Box>
  );
};
