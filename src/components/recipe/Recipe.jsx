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
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { produce, setAutoFreeze } from 'immer';
import { Router, useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { random } from '../../lib/tools';
import { Ingredients } from '../ingredients/Ingredients';

setAutoFreeze(false);

export const Recipe = ({ editable, recipeId }) => {
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
        formValues.desc.forEach((list, i) => (draft[i].list = list));
        formValues.group.forEach((name, i) => (draft[i].groupName = name));
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
      setInstanceKey(random(instanceKey));
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
      setInstanceKey(random(instanceKey));
      setIngredients(formState);
    },
    [formStateTransform, unregisterAll]
  );

  const handleReset = useCallback(() => {
    unregisterAll();
    setInstanceKey(random(instanceKey));
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
    console.log(`fetching ${fetchUrl}`);
    const response = await fetch(fetchUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients: formState }),
    });
    console.log('fetched.');

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    let res = await response.json();
    setRecipe(res.data);
    setLoading(false);
  };

  const onFormSubmit = async (data) => {
    console.log('ON FORM SUBMIT');
    setIsSubmitting(true);
    setLoading(true);
    const formState = formStateTransform();
    unregisterAll();
    setIngredients(formState);

    try {
      console.log(data);
      await saveRecipe(formState);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const onFormError = (errors, event) => {
    console.log(errors, event);
  };

  return (
    <Box borderRadius="lg">
      <FormProvider {...formMethods}>
        <Flex p={2}>
          <form onSubmit={handleSubmit(onFormSubmit, onFormError)}>
            <HStack mt="8">
              <Box width="20px"></Box>
              <Heading color={mode('purple.500', 'purple.300')}>
                <Text>{recipe?.title || 'Loading...'}</Text>
              </Heading>

              <Box width="20px" pos="relative">
                {loading && (
                  <Box transform="translate(2px, -10px)">
                    <Spinner color={mode('pink.400', 'purple.200')} />
                  </Box>
                )}
              </Box>
            </HStack>
            <Box pos="relative">
              <Fade in={loading} transition={{ duration: 1 }}>
                <Box
                  //hidden={!loading}
                  pos="absolute"
                  left="0"
                  top="0"
                  bottom="0"
                  right="0"
                  bg="rgba(0,0,0,0.2)"
                  zIndex="1300"
                  borderRadius="md"
                />
              </Fade>
              <Box>
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
            </Box>

            <Box my="8px" align="end">
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
            </Box>
            {/*         
        <Box>
          <pre>{JSON.stringify(ingredients, undefined, 2)}</pre>
        </Box> */}
          </form>
        </Flex>
      </FormProvider>
    </Box>
  );
};
