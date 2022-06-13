import {
  Box,
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

export const Ingredients = ({ ingredients, editable }) => {
  const [localIngredients, setLocalIngredients] = useState(ingredients);

  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors, isSubmitting },
    getValues,
    reset,
  } = useFormContext();

  const handleNewIngredient = (groupIdx) => {
    setLocalIngredients(
      produce(localIngredients, (draft) => {
        draft[groupIdx].list.push('');
      })
    );
  };

  return (
    <Box bg="blackAlpha.300" borderRadius={4} my={4} p={4}>
      <Heading pb="2" borderBottomWidth={1} size="md">
        Ingredients
      </Heading>
      <Box>
        <pre>{JSON.stringify(localIngredients, undefined, 2)}</pre>
      </Box>
      <Box m="8px" justify="center" align="center" grow="1">
        <Box maxWidth="1200px" justify="center" align="center">
          <Box>
            {localIngredients.map((group, groupIdx) => {
              return (
                <Box key={group.groupName} align="left" mt="20px">
                  {group.groupName !== 'default' && (
                    <Box>
                      <Stack direction="row" align="center">
                        <Heading pb="2" size="md">
                          {group.groupName}
                        </Heading>
                        <IconButton
                          isRound
                          aria-label="Toggle Dark Mode"
                          fontSize="1.2rem"
                          variant="ghost"
                          color="purple.200"
                          icon={<Icon as={FileMinus} />}
                        />
                      </Stack>
                    </Box>
                  )}
                  {group.list.map((ing, ingIdx) => (
                    <Ingredient
                      key={`${groupIdx}_${ingIdx}`}
                      editable={editable}
                      fieldId={`${groupIdx}_${ingIdx}`}
                      desc={ing}
                    />
                  ))}
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
                </Box>
              );
            })}
          </Box>
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
        </Box>
      </Box>
    </Box>
  );
};
