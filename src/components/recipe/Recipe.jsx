import {
  Box,
  Button,
  Center,
  Fade,
  Flex,
  Heading,
  HStack,
  Spinner,
  Square,
  Text,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import { produce, setAutoFreeze } from 'immer';
import { Router, useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { random } from '../../lib/tools';
import { Ingredients } from '../ingredients/Ingredients';

setAutoFreeze(false);

export const Recipe = ({ editable, recipeId }) => {
  const { colorMode } = useColorMode();
  const mode = (lightValue, darkValue) =>
    colorMode == 'light' ? lightValue : darkValue;

  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [instanceKey, setInstanceKey] = useState(random());
  const [reload, setReload] = useState(0);

  const router = useRouter();

  const formMethods = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
    shouldUseNativeValidation: false,
    delayError: 500,
  });

  const {
    //register,
    unregister,
    //formState,
    //watch,
    handleSubmit,
    reset: formReset,
    //resetField,
    //setError,
    //clearErrors,
    //setValue,
    //setFocus,
    getValues,
    //getFieldState,
    //trigger,
    //control,
  } = formMethods;

  // const {
  //   isDirty,
  //   dirtyFields,
  //   touchedFields,
  //   isSubmitted,
  //   isSubmitSuccessful,
  //   isSubmitting: formIsSubmitting,
  //   submitCount,
  //   isValid,
  //   isValidating,
  //   errors,
  // } = formState;

  useEffect(() => {
    formReset();
  }, [formReset, ingredients]);

  const unregisterAll = useCallback(() => {
    unregister(['group', 'desc']);
  }, [unregister]);

  // Since produce locks the object returned, we get a copy
  const formStateTransform = useCallback(
    () =>
      produce(ingredients, (draft) => {
        const formValues = getValues();
        formValues?.desc?.forEach((list, i) => (draft[i].list = list));
        formValues?.group?.forEach((name, i) => (draft[i].groupName = name));
      }),
    [getValues, ingredients]
  );

  const handleNewIngredient = useCallback(
    (groupIdx) => {
      const formState = formStateTransform();
      unregisterAll();
      formState[groupIdx].list.push('');
      setIngredients(formState);
    },
    [formStateTransform, unregisterAll]
  );

  const handleDeleteIngredient = useCallback(
    (groupIdx, ingIdx) => {
      const formState = formStateTransform();
      unregisterAll();
      formState[groupIdx].list.splice(ingIdx, 1);
      setInstanceKey((prev) => random(prev));
      setIngredients(formState);
    },
    [formStateTransform, unregisterAll]
  );

  const handleDeleteGroup = useCallback(
    (groupIdx) => {
      const formState = formStateTransform();
      unregisterAll();
      formState.splice(groupIdx, 1);
      setIngredients(formState);
    },
    [formStateTransform, unregisterAll]
  );

  const handleNewGroup = useCallback(() => {
    const formState = formStateTransform();
    unregisterAll();
    formState.push({ groupName: '', list: [''] });
    setIngredients(formState);
  }, [formStateTransform, unregisterAll]);

  const handleReorder = useCallback(
    (groupIdx, items) => {
      const formState = formStateTransform();
      unregisterAll();
      const newList = [];
      const oldList = formState[groupIdx].list;
      items.forEach((v) => newList.push(oldList[parseInt(v.id)]));
      formState[groupIdx].list = newList;
      setInstanceKey((prev) => random(prev));
      setIngredients(formState);
    },
    [formStateTransform, unregisterAll]
  );

  const handleReset = useCallback(() => {
    unregisterAll();
    setInstanceKey((prev) => random(prev));
  }, [unregisterAll]);

  const handleReload = useCallback(() => {
    setLoading(true);
    setReload((reload) => reload ^ 1);
    // router.replace(router.asPath); // This call refreshes page without reloading and causes Next.js to reapply getServerSideProps() method
  }, []);

  useEffect(() => {
    let abort = false;
    setLoading(true);

    if (!recipeId) {
      console.log('recipeId is not defined. Aborting fetch.');
      return;
    }
    try {
      const loadRecipe = async () => {
        const fetchUrl = `/api/my/recipes/${recipeId}`;
        console.log(`fetching ${fetchUrl}`);
        const response = await fetch(fetchUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        console.log('fetched.');

        if (abort) return;
        let res = await response.json();
        setRecipe(res.data);
        setIngredients(res.data?.ingredients ?? []);
      };

      loadRecipe();
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
    handleReset();
    return () => {
      abort = true;
    };
  }, [recipeId, handleReset, reload]);

  const saveRecipe = async (formState) => {
    const fetchUrl = `/api/my/recipes/${recipeId}`;
    console.log(`patching ${fetchUrl}`);
    const response = await fetch(fetchUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients: formState }),
    });
    console.log('patched.');

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    let res = await response.json();
    setRecipe(res.data);
  };

  const onFormSubmit = async (data) => {
    console.log('ON FORM SUBMIT');
    setIsSubmitting(true);
    setLoading(true);
    const formState = formStateTransform();

    try {
      console.log(data);
      await saveRecipe(formState);
      console.log('SAVED!');
    } catch (e) {
      console.log('error', e);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
      setReload((reload) => reload ^ 1);
    }
  };

  const onFormError = (errors, event) => {
    console.log('ON FORM ERROR!');
    console.log(errors, event);
  };

  return (
    <Flex
      grow="1"
      justify="center"
      align="stretch"
      borderRadius="lg"
      bgGradient={mode(
        'linear(to-r, purple.100, pink.100)',
        'linear(to-r, purple.900, pink.900)'
      )}
    >
      <FormProvider {...formMethods}>
        <Box flex="1">
          <form onSubmit={handleSubmit(onFormSubmit, onFormError)}>
            <VStack>
              <HStack width="full" align="center" justify="center" p={4}>
                <Box height="6rem" width="20px"></Box>
                <Heading
                  textAlign="center"
                  color={mode('purple.500', 'purple.300')}
                >
                  <Text>{recipe?.title || 'Loading...'}</Text>
                </Heading>

                <Box width="20px">
                  {loading && (
                    <Box transform="translate(2px, -10px)">
                      <Spinner color={mode('pink.400', 'purple.200')} />
                    </Box>
                  )}
                </Box>
              </HStack>

              <HStack
                wrap="wrap"
                gap={8}
                width="full"
                align="stretch"
                justify="start"
                p={4}
              >
                <VStack
                  borderRadius="lg"
                  borderWidth="thin"
                  borderColor="pink.200"
                  bgColor={mode('whiteAlpha.900', 'blackAlpha.500')}
                  pos="relative"
                >
                  <Fade in={loading} transition={{ duration: 0.5 }}>
                    <Box
                      //hidden={!loading}
                      pos="absolute"
                      left="0"
                      top="0"
                      bottom="0"
                      right="0"
                      bg="rgba(0,0,0,0.8)"
                      zIndex="10000"
                      borderRadius="lg"
                      //overflow="hidden"
                    />
                  </Fade>
                  <Box p={4}>
                    {ingredients && (
                      <Ingredients
                        loading={loading}
                        editable={editable}
                        ingredients={ingredients}
                        handleDeleteGroup={handleDeleteGroup}
                        handleDeleteIngredient={handleDeleteIngredient}
                        handleNewGroup={handleNewGroup}
                        handleNewIngredient={handleNewIngredient}
                        handleReorder={handleReorder}
                        handleReset={handleReset}
                        handleReload={handleReload}
                        instanceKey={instanceKey}
                      />
                    )}
                  </Box>
                </VStack>
                <VStack
                  borderRadius="lg"
                  borderWidth="thin"
                  borderColor="pink.200"
                  bgColor={mode('whiteAlpha.900', 'blackAlpha.500')}
                  align="start"
                  flex={1}
                >
                  <Box p={4}>asdf</Box>
                </VStack>
              </HStack>
              <HStack width="full" align="start" justify="center" p={4}>
                <Box flex="1"></Box>
                <Button
                  type="submit"
                  color={mode('pink.50', 'pink.800')}
                  colorScheme="pink"
                  //variant="gradient"
                  //bgGradient="linear(to-r, purple.300, pink.300)"
                  textTransform={'uppercase'}
                  letterSpacing={1.1}
                  fontWeight="semibold"
                  isLoading={isSubmitting}
                >
                  Save Recipe
                </Button>
              </HStack>
            </VStack>
          </form>
        </Box>
      </FormProvider>
    </Flex>
  );
};
