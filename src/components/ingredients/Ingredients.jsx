import deepEqual from 'deep-equal';

import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  useColorModeValue as mode,
  VStack,
} from '@chakra-ui/react';
import { FilePlus } from '@styled-icons/feather';

import { IngredientGroup } from './IngredientGroup';

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
        <Heading size="md" fontFamily="ingredients">
          Ingredients{' '}
        </Heading>
      </HStack>
      <Box>
        {ingredients.map((group, groupIdx) => (
          <IngredientGroup
            loading={loading}
            key={`key_${instanceKey}_group_${groupIdx}`}
            instanceKey={instanceKey}
            data={group}
            groupIdx={groupIdx}
            editable={editable}
            handleDeleteGroup={handleDeleteGroup}
            handleDeleteIngredient={handleDeleteIngredient}
            handleNewIngredient={handleNewIngredient}
            handleReorder={handleReorder}
          />
        ))}
      </Box>
      {editable && (
        <>
          <Flex>
            <IconButton
              isRound
              aria-label="Add New Group"
              fontSize="1.2rem"
              variant="ghost"
              icon={<Icon as={FilePlus} />}
              onClick={() => handleNewGroup()}
            />
          </Flex>
        </>
      )}
    </VStack>
  );
};
