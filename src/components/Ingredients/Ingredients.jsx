import { Box, Flex, Heading, Icon, IconButton, Text } from '@chakra-ui/react';
import { FilePlus } from '@styled-icons/feather';
import { produce } from 'immer';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import useRenderCounter from '../../lib/hooks/useRenderCounter';
import { getCircularReplacer, stripRef } from '../../lib/tools';
import IngredientGroup from '../IngredientGroup/IngredientGroup';

export const Ingredients = ({ ingredients, editable }) => {
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

  const handleNewIngredient = (groupIdx) => {
    const formValues = getValues();
    setLocalIngredients(
      produce(localIngredients, (draft) => {
        formValues.desc.forEach((v, i) => {
          if (i === groupIdx) {
            v = produce(v, (draft) => {
              draft.push('');
            });
          }
          draft[i].list = v;
        });
      })
    );
  };

  const handleDeleteIngredient = (groupIdx, ingIdx) => {
    const formValues = getValues();
    unregisterAll();
    setLocalIngredients(
      produce(localIngredients, (draft) => {
        formValues.desc.forEach((v, i) => {
          draft[i].list = v;
        });
        draft[groupIdx].list = produce(draft[groupIdx].list, (draft) => {
          draft.splice(ingIdx, 1);
        });
      })
    );
  };

  const handleDeleteGroup = (groupIdx) => {
    unregisterAll();
    setLocalIngredients(
      produce(localIngredients, (draft) => {
        draft.splice(groupIdx, 1);
      })
    );
  };

  const handleNewGroup = () => {
    setLocalIngredients(
      produce(localIngredients, (draft) => {
        draft.push({ groupName: '', list: [''] });
      })
    );
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
                key={`key_group_${group.groupName}`}
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
