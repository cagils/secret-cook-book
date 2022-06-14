import {
  Box,
  Button,
  Center,
  Code,
  Flex,
  Heading,
  Icon,
  IconButton,
  Square,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { forwardRef, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Controller,
  useController,
  useForm,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';
import { Ingredient } from '../Ingredient/Ingredient';
import {
  FilePlus,
  FileMinus,
  PlusSquare,
  MinusSquare,
} from '@styled-icons/feather';
import { produce } from 'immer';
import { set } from 'mongoose';
import useRenderCounter from '../../lib/hooks/useRenderCounter';

export const Ingredients = ({ ingredients, editable }) => {
  const [localIngredients, setLocalIngredients] = useState(ingredients);

  useEffect(() => {
    //formReset();
  }, [formReset, localIngredients]);

  const {
    handleSubmit,
    register,
    unregister,
    control,
    watch,
    formState: { errors, isSubmitting },
    getValues,
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

  const handleNewIngredient = (groupIdx) => {
    const formValues = getFormValues();
    setLocalIngredients(
      produce(localIngredients, (draft) => {
        formValues.forEach((v, i) => (draft[i].list = v));
        draft[groupIdx].list.push('');
      })
    );
  };

  const handleDeleteIngredient = (groupIdx, ingIdx) => {
    const formValues = getFormValues();
    setLocalIngredients(
      produce(localIngredients, (draft) => {
        formValues.forEach((v, i) => (draft[i].list = v));
        draft[groupIdx].list.splice(ingIdx, 1);
      })
    );
  };

  const renderCounter = useRenderCounter();

  return (
    <Box bg="blackAlpha.300" borderRadius={4} my={4} p={4}>
      <Heading pb="2" borderBottomWidth={1} size="md">
        Ingredients
        {renderCounter}
      </Heading>
      <Box>
        <pre>{JSON.stringify(localIngredients, undefined, 2)}</pre>
        <pre>{JSON.stringify(getValues(), undefined, 2)}</pre>
      </Box>
      <Box m="8px" justify="center" align="center" grow="1">
        <Box maxWidth="1200px" justify="center" align="center">
          <Box>
            {localIngredients.map((group, groupIdx) => (
              <Box key={group.groupName} align="left" mt="20px">
                {group.groupName !== 'default' && (
                  <Box>
                    <Stack direction="row" align="center">
                      <Heading pb="2" size="md">
                        {group.groupName}
                      </Heading>
                      {editable && (
                        <IconButton
                          isRound
                          aria-label="Toggle Dark Mode"
                          fontSize="1.2rem"
                          variant="ghost"
                          color="purple.200"
                          icon={<Icon as={FileMinus} />}
                        />
                      )}
                    </Stack>
                  </Box>
                )}
                {group.list.map((ing, ingIdx) => (
                  <Ingredient
                    key={`${groupIdx}_${ingIdx}`}
                    editable={editable}
                    fieldId={`${groupIdx}_${ingIdx}`}
                    desc={ing}
                    handleDeleteIngredient={() =>
                      handleDeleteIngredient(groupIdx, ingIdx)
                    }
                  />
                ))}
                {editable && (
                  <Square>
                    <IconButton
                      isRound
                      aria-label="Toggle Dark Mode"
                      fontSize="1.2rem"
                      variant="ghost"
                      color="purple.200"
                      icon={<Icon as={PlusSquare} />}
                      onClick={() => handleNewIngredient(groupIdx)}
                    />
                  </Square>
                )}
              </Box>
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
                />
              </Flex>
              <Flex>
                <Button color="gray.800" onClick={() => formReset()}>
                  RESET FORM
                </Button>
              </Flex>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};
