import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  useColorModeValue as mode,
  VStack,
} from '@chakra-ui/react';
import { FilePlus } from '@styled-icons/feather';

import { IngredientGroup } from '@/components/ingredients/IngredientGroup';

export const Ingredients = ({
  loading,
  ingredients,
  editable,
  handleDeleteGroup,
  handleDeleteIngredient,
  handleNewGroup,
  handleNewIngredient,
  handleReorder,
  instanceKey,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _EXAMPLE_FORMAT_ = [
    {
      groupName: 'cake',
      list: [
        '150ml sunflower oil, plus extra for the tin',
        '175g self-raising flour',
        '2 tbsp cdocoa powder',
        '1 tsp bicarbonate of soda',
        '150g caster sugar',
        '2 tbsp golden syrup',
        '2 large eggs, lightly beaten',
        '150ml semi-skimmed milk',
      ],
    },
    {
      groupName: 'icing',
      list: [
        '100g unsalted butter',
        '225g icing sugar',
        '40g cocoa powder',
        '2½ tbsp milk (a little more if needed)',
      ],
    },
  ];

  return (
    <VStack
      align="stretch"
      justify="start"
      // bg="blackAlpha.300"
    >
      <HStack>
        <Heading
          width="full"
          textAlign="start"
          as="h3"
          fontFamily="heading"
          fontWeight="semibold"
          color={mode('pink.500', 'pink.300')}
          fontSize={{
            base: '2em',
            sm: '2.5em',
            md: '3em',
            lg: '3em',
            xl: '4em',
          }}
        >
          Ingredients
        </Heading>
      </HStack>
      <Divider />
      <Box>
        {ingredients.map((group, groupIdx) => (
          <IngredientGroup
            loading={loading}
            key={`key_${instanceKey}_group_${groupIdx}`}
            instanceKey={instanceKey}
            data={group}
            groupIdx={groupIdx}
            editable={editable}
            hasHeading={ingredients.length > 1}
            handleDeleteGroup={handleDeleteGroup}
            handleDeleteIngredient={handleDeleteIngredient}
            handleNewIngredient={handleNewIngredient}
            handleReorder={handleReorder}
          />
        ))}
      </Box>
      <>
        <Flex>
          {editable && (
            <IconButton
              isRound
              aria-label="Add New Group"
              fontSize="1.2rem"
              variant="ghost"
              icon={<Icon as={FilePlus} />}
              onClick={() => handleNewGroup()}
            />
          )}
        </Flex>
      </>
    </VStack>
  );
};
