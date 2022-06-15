import { Box, Flex, Heading, Icon, IconButton, Text } from '@chakra-ui/react';
import { FilePlus } from '@styled-icons/feather';
import { produce } from 'immer';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import useRenderCounter from '../../lib/hooks/useRenderCounter';
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

  const getFormValues = () => {
    const values = getValues();
    const valuesEntries = Object.entries(values);
    const formValues = [];
    valuesEntries.forEach(([k, v]) => {
      const groupIdx = k.split('_')[1];
      if (formValues[groupIdx]) {
        formValues[groupIdx].push(v);
      } else {
        formValues[groupIdx] = [v];
      }
    });

    return formValues;
  };

  const unregisterAll = (formValues) => {
    Object.entries(formValues).forEach(([key, value]) => {
      unregister(key, value);
    });
  };

  const handleNewIngredient = (groupIdx) => {
    const formValues = getFormValues();
    // unregisterAll(formValues);
    setLocalIngredients(
      produce(localIngredients, (draft) => {
        formValues.forEach((v, i) => (draft[i].list = v));
        draft[groupIdx].list.push('');
      })
    );
  };

  const handleDeleteIngredient = (groupIdx, ingIdx) => {
    const formValues = getFormValues();
    unregisterAll(formValues);
    setLocalIngredients(
      produce(localIngredients, (draft) => {
        formValues.forEach((v, i) => (draft[i].list = v));
        draft[groupIdx].list.splice(ingIdx, 1);
      })
    );
  };

  const handleDeleteGroup = (groupIdx) => {
    const formValues = getFormValues();
    unregisterAll(formValues);
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
                key={group.groupName}
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
