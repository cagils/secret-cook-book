import { Box, Flex, Heading, Icon, IconButton, Text } from '@chakra-ui/react';
import { FilePlus } from '@styled-icons/feather';
import { produce, setAutoFreeze } from 'immer';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import useRenderCounter from '../../lib/hooks/useRenderCounter';
import { getCircularReplacer, stripRef } from '../../lib/tools';
import IngredientGroup from '../IngredientGroup/IngredientGroup';

setAutoFreeze(false);

export const Ingredients = ({ ingredients, editable }) => {
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

  const showDebugData = process.env.NEXT_PUBLIC_SHOW_DEBUG_DATA === 'true';

  const [localIngredients, setLocalIngredients] = useState(ingredients);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    formReset();
  }, [formReset, localIngredients]);

  const {
    handleSubmit,
    register,
    unregister,
    control,
    watch,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
    reset: formReset,
  } = useFormContext();

  const unregisterAll = () => {
    unregister(['group', 'desc']);
  };

  // Since produce locks the object returned, we get a copy
  const formStateTransform = () =>
    produce(localIngredients, (draft) => {
      const formValues = getValues();
      formValues.desc.forEach((list, i) => (draft[i].list = list));
      formValues.group.forEach((name, i) => (draft[i].groupName = name));
    });

  const handleNewIngredient = (groupIdx) => {
    const formState = formStateTransform();
    unregisterAll();
    formState[groupIdx].list.push('');
    setLocalIngredients(formState);
  };

  const handleDeleteIngredient = (groupIdx, ingIdx) => {
    const formState = formStateTransform();
    unregisterAll();
    formState[groupIdx].list.splice(ingIdx, 1);
    setLocalIngredients(formState);
  };

  const handleDeleteGroup = (groupIdx) => {
    const formState = formStateTransform();
    unregisterAll();
    formState.splice(groupIdx, 1);
    setLocalIngredients(formState);
  };

  const handleNewGroup = () => {
    const formState = formStateTransform();
    unregisterAll();
    formState.push({ groupName: '', list: [''] });
    setLocalIngredients(formState);
  };

  return (
    <Box bg="blackAlpha.300" borderRadius={4} my={4} p={4}>
      <Heading pb="2" borderBottomWidth={1} size="md">
        Ingredients
      </Heading>
      <Text size="md">Render Counter: {renderCounter}</Text>
      {showDebugData && (
        <Box>
          {'debug:' + JSON.stringify(showDebugData)}
          <pre>{JSON.stringify(localIngredients, undefined, 2)}</pre>
        </Box>
      )}
      <Box m="8px" justify="center" align="center" grow="1">
        <Box maxWidth="1200px" justify="center" align="center">
          <Box>
            {localIngredients.map((group, groupIdx) => (
              <IngredientGroup
                key={`key_group_${groupIdx}`}
                data={group}
                groupIdx={groupIdx}
                editable={editable}
                handleDeleteGroup={handleDeleteGroup}
                handleDeleteIngredient={handleDeleteIngredient}
                handleNewIngredient={handleNewIngredient}
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
  );
};
