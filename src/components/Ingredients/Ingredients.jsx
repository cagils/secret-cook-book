import deepEqual from 'deep-equal';

import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { FilePlus } from '@styled-icons/feather';

import { useFormContext } from 'react-hook-form';

import useRenderCounter from '../../lib/hooks/useRenderCounter';

import { IngredientGroup } from '../IngredientGroup/IngredientGroup';

export const Ingredients = ({
  ingredients,
  editable,
  handleDeleteGroup,
  handleDeleteIngredient,
  handleNewGroup,
  handleNewIngredient,
  handleReorder,
  handleReset,
  instanceKey,
  loading,
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

  const renderCounter = useRenderCounter();

  return (
    <>
      <Box pos="absolute" bg="red" top="0" left="0" />
      <Box bg="blackAlpha.300" borderRadius={4} my={4} p={4}>
        <Heading height="2.3rem" pb={2} borderBottomWidth={1} size="md">
          Ingredients{' '}
          <Button
            colorScheme="pink"
            variant="outline"
            fontSize="xs"
            height="1.8rem"
            my={0}
            mx={2}
            py={0}
            onClick={() => handleReset()}
          >
            RESET
          </Button>
        </Heading>
        <Text size="md">Render Counter: {renderCounter}</Text>
        <Box m="8px" justify="center" align="center" grow="1">
          <Box maxWidth="1200px" justify="center" align="center">
            <Box>
              {ingredients.map((group, groupIdx) => (
                <IngredientGroup
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
                    aria-label="Toggle Dark Mode"
                    fontSize="1.2rem"
                    variant="ghost"
                    color="purple.200"
                    icon={<Icon as={FilePlus} />}
                    onClick={() => handleNewGroup()}
                  />
                </Flex>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};
