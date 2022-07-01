import { Box, Divider, Heading, Text, useColorMode } from '@chakra-ui/react';
import { OrnamentDivider } from '../../resources/svgs';
import { FInput } from '../helpers/form/FInput';

export const RecipeTitle = ({ recipeTitle, editable, loading }) => {
  const { colorMode } = useColorMode();
  const mode = (lightValue, darkValue) =>
    colorMode == 'light' ? lightValue : darkValue;

  return (
    <Box>
      {!editable ? (
        <Box>
          <Heading
            as="h2"
            size="2xl"
            fontSize={{
              base: '3em',
              md: '3em',
              lg: '3em',
              xl: '4em',
            }}
            textAlign="center"
            fontFamily="heading"
            color={mode('pink.500', 'pink.200')}
            letterSpacing="wide"
            fontWeight="bold"
            textDecoration="underline"
            textUnderlineOffset={'0.05em'}
            textDecorationThickness="2px"
            textDecorationColor={mode('purple.300', 'purple.400')}
            fontStyle="italic"
            //textTransform={'capitalize'}
          >
            {recipeTitle || 'Loading...'}
          </Heading>
        </Box>
      ) : (
        <Box>
          <FInput
            fieldName={`title`}
            rules={{ required: 'This is required' }}
            label={null}
            helper={null}
            defaultValue={recipeTitle}
            placeholder="Item name"
            // rest...
            disabled={loading}
            fontSize={{
              base: '3em',
              md: '3em',
              lg: '3em',
              xl: '4em',
            }}
            textAlign="center"
            fontFamily="heading"
            color={mode('pink.500', 'pink.200')}
            letterSpacing="wide"
            fontWeight="bold"
            textDecoration="underline"
            textUnderlineOffset={'0.05em'}
            textDecorationThickness="2px"
            textDecorationColor={mode('purple.300', 'purple.400')}
            fontStyle="italic"
            height="1.4em"
            //textTransform={'capitalize'}
          />
        </Box>
      )}
    </Box>
  );
};
