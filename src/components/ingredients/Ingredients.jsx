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

import { useRenderCounter } from '../../lib/hooks/useRenderCounter';

import { IngredientGroup } from './IngredientGroup/IngredientGroup';

export const Ingredients = ({
  loading,
  ingredients,
  editable,
  handleDeleteGroup,
  handleDeleteIngredient,
  handleNewGroup,
  handleNewIngredient,
  handleReorder,
  handleReset,
  handleReload,
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

  const renderCounter = useRenderCounter();

  return (
    <VStack
      align="stretch"
      justify="start"
      // bg="blackAlpha.300"
      borderRadius="lg"
      my={4}
      py={8}
      px={4}
      borderWidth="thin"
      borderColor="pink.200"
      bgColor={mode('whiteAlpha.900', 'gray.700')}
    >
      <HStack mb="2">
        <Heading size="md" fontFamily="body">
          Ingredients{' '}
        </Heading>
        <Button
          size="xs"
          colorScheme="pink"
          variant="outline"
          onClick={() => handleReset()}
        >
          RESET
        </Button>
        <Button
          size="xs"
          colorScheme="cyan"
          variant="outline"
          onClick={() => handleReload()}
        >
          RELOAD
        </Button>
      </HStack>
      <Text size="md">Render Counter: {renderCounter}</Text>
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
              //color="purple.200"
              icon={<Icon as={FilePlus} />}
              onClick={() => handleNewGroup()}
            />
          </Flex>
        </>
      )}
    </VStack>
  );
};
