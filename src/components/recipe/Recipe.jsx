import {
  Box,
  Button,
  Center,
  Divider,
  Fade,
  Flex,
  Heading,
  HStack,
  Image,
  Spinner,
  Square,
  Text,
  Textarea,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import { produce, setAutoFreeze } from 'immer';
import ImageNext from 'next/image';
import { Router, useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { useRenderCounter } from '../../lib/hooks/useRenderCounter';
import { random } from '../../lib/tools';
import { OverlayFader } from '../helpers/OverlayFader';
import { Ingredients } from '../ingredients/Ingredients';
import { Description } from './Description';
import { Photo } from './Photo';
import { RecipeTitle } from './RecipeTitle';
import { ShortDesc } from './ShortDesc';

setAutoFreeze(false);

export const Recipe = ({ initialEditable, recipeId }) => {
  const renderCounter = useRenderCounter();
  const [editable, setEditable] = useState(initialEditable);
  const { colorMode } = useColorMode();
  const mode = (lightValue, darkValue) =>
    colorMode == 'light' ? lightValue : darkValue;

  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [description, setDescription] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [title, setTitle] = useState('');
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
  const formStateIngredientsTransform = useCallback(
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
      const formStateIngredients = formStateIngredientsTransform();
      unregisterAll('ingredients');
      formStateIngredients[groupIdx].list.push('');
      setIngredients(formStateIngredients);
    },
    [formStateIngredientsTransform, unregisterAll]
  );

  const handleDeleteIngredient = useCallback(
    (groupIdx, ingIdx) => {
      const formStateIngredients = formStateIngredientsTransform();
      unregisterAll('ingredients');
      formStateIngredients[groupIdx].list.splice(ingIdx, 1);
      setInstanceKey((prev) => random(prev));
      setIngredients(formStateIngredients);
    },
    [formStateIngredientsTransform, unregisterAll]
  );

  const handleDeleteGroup = useCallback(
    (groupIdx) => {
      const formStateIngredients = formStateIngredientsTransform();
      unregisterAll('ingredients');
      formStateIngredients.splice(groupIdx, 1);
      setIngredients(formStateIngredients);
    },
    [formStateIngredientsTransform, unregisterAll]
  );

  const handleNewGroup = useCallback(() => {
    const formStateIngredients = formStateIngredientsTransform();
    unregisterAll('ingredients');
    formStateIngredients.push({ groupName: '', list: [''] });
    setIngredients(formStateIngredients);
  }, [formStateIngredientsTransform, unregisterAll]);

  const handleReorder = useCallback(
    (groupIdx, items) => {
      const formStateIngredients = formStateIngredientsTransform();
      unregisterAll('ingredients');
      const newList = [];
      const oldList = formStateIngredients[groupIdx].list;
      items.forEach((v) => newList.push(oldList[parseInt(v.id)]));
      formStateIngredients[groupIdx].list = newList;
      //setInstanceKey((prev) => random(prev));
      setIngredients(formStateIngredients);
    },
    [formStateIngredientsTransform, unregisterAll]
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

  const changeEditable = useCallback((value) => {
    console.log('value', value);
    setEditable(value);
  }, []);

  const handleEdit = useCallback(() => {
    setEditable(true);
  }, []);

  const cancelEdit = useCallback(() => {
    setEditable(false);
    handleReload();
  }, [handleReload]);

  useEffect(() => {
    let abort = false;
    setLoading(true);

    if (!recipeId) {
      console.log('recipeId is not defined. Aborting fetch.');
      return;
    }

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
        console.log(
          'response was not ok:',
          JSON.stringify(response, undefined, 2)
        );
        throw new Error(`Error: ${response.status}`);
      }
      console.log('fetched.');

      if (abort) return;
      let res = await response.json();
      setRecipe(res.data);
      setIngredients(res.data?.ingredients ?? []);
      const desc = res.data?.description?.text.replace(/\\n/g, '\n');
      const shortDesc = res.data?.shortDesc.replace(/\\n/g, '\n');
      const title = res.data?.title;
      setDescription(desc ?? '');
      setShortDesc(shortDesc ?? '');
      setTitle(title ?? '');
    };

    loadRecipe()
      .then(() => {
        setLoading(false);
        handleReset();
      })
      .catch((e) => {
        console.log('Error thrown from loadRecipe', e);
      });

    return () => {
      console.log('returning from useEffect fetch');
      abort = true;
    };
  }, [recipeId, handleReset, reload]);

  const saveRecipe = async () => {
    changeEditable(false);

    // const formValues = getValues();

    // console.log('SAVE RECIPE: ');
    // console.log('formValues:');
    // console.log(JSON.stringify(formValues, undefined, 2));

    const formStateIngredients = formStateIngredientsTransform();
    console.log('formStateIngredients:');
    console.log(JSON.stringify(formStateIngredients, undefined, 2));

    const formStateDescription = getValues()?.description?.text || description;
    const formStateShortDesc = getValues()?.shortDesc || shortDesc;
    const formStateTitle = getValues()?.title || title;

    const fetchUrl = `/api/my/recipes/${recipeId}`;
    console.log(`patching ${fetchUrl}`);
    const response = await fetch(fetchUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: formStateTitle,
        shortDesc: formStateShortDesc,
        description: { text: formStateDescription },
        ingredients: formStateIngredients,
      }),
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

    try {
      console.log(data);
      await saveRecipe();
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
    <FormProvider {...formMethods}>
      <Box
        as="form"
        // css="width: 100%; padding: 2px"
        width="full"
        onSubmit={handleSubmit(onFormSubmit, onFormError)}
      >
        <VStack
          //width="full"
          align="center"
          justify="center"
          px={{ base: '2', sm: '2', md: '4', xl: '5', '2xl': '5' }}
          pb={4}
          spacing={0}
          gap={4}
        >
          <Box
            boxShadow={mode('base', 'baseWhite')}
            //width="full"
            align="center"
            justify="center"
            bgColor={mode('whiteAlpha.800', 'blackAlpha.500')}
            //bgGradient={mode('linear(to-r, purple.50, pink.200)')}
            borderRadius="lg"
            px={4}
            py={8}
            mt={8}
            width="full"
            //px={16}
            position="relative"
            overflow="hidden"
          >
            <RecipeTitle
              recipeTitle={recipe?.title}
              editable={editable}
              loading={loading}
              handleEdit={handleEdit}
            />
            <OverlayFader active={loading} />
          </Box>
          <Flex
            //width="full"
            align="stretch"
            justify="center"
            //bgGradient={mode('linear(to-r, purple.50, pink.200)')}
            width="full"
            wrap="wrap-reverse"
            // rowGap={2}
            // columnGap={4}
            gap={4}
          >
            <VStack
              boxShadow={mode('base', 'baseWhite')}
              // borderWidth="thin"
              borderColor="pink.200"
              bgColor={mode('whiteAlpha.900', 'blackAlpha.500')}
              //pos="relative"
              //overflow="hidden"
              borderRadius="lg"
              //flexGrow="1"
              flex="2"
              spacing={0}
              gap={4}
              //width="30%"
              minW="300px"
            >
              <Box
                p={8}
                // grow="1"
                // alignSelf="stretch"
                width="full"
                height="full"
                pos="relative"
                overflow="hidden"
                // border="1px solid red"
              >
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
                    instanceKey={instanceKey}
                  />
                )}
                <OverlayFader active={loading} />
              </Box>
            </VStack>
            <VStack
              align="stretch"
              justify="center"
              spacing={0}
              flex="5"
              minW={{
                base: '300px',
                sm: '500px',
                md: '500px',
                lg: '600px',
                xl: '800px',
              }}
              pos="relative"
              overflow="hidden"
            >
              <Box
                align="center"
                justfiy="center"
                flex="1"
                p={{ base: '4px', sm: '6px', md: '8px', xl: '10px' }}
                borderRadius="lg"
                boxShadow={mode('base', 'baseWhite')}
                bgColor={mode('whiteAlpha.900', 'blackAlpha.500')}
              >
                <Photo photoUrl={recipe?.photo} />
                <ShortDesc
                  shortDesc={recipe?.shortDesc}
                  editable={editable}
                  loading={loading}
                />
                <Description
                  editable={editable}
                  description={description}
                  loading={loading}
                />
              </Box>
              <OverlayFader active={loading} />
            </VStack>
          </Flex>
          <HStack
            boxShadow={mode('base', 'baseWhite')}
            //borderWidth="thin"
            borderColor="pink.200"
            bgColor={mode('whiteAlpha.900', 'blackAlpha.500')}
            width="full"
            align="center"
            justify="center"
            //bgColor={mode('whiteAlpha.400', 'blackAlpha.400')}
            borderRadius="lg"
            p={4}
            mt={4}
          >
            <Box flex="1"></Box>
            <Button size="xs" variant="outline" onClick={() => handleReset()}>
              RESET
            </Button>
            <Button size="xs" variant="outline" onClick={() => handleReload()}>
              RELOAD
            </Button>
            {editable ? (
              <>
                <Button
                  size="md"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    cancelEdit();
                  }}
                  color={mode('white', 'pink.800')}
                  //variant="gradient"
                  //bgGradient="linear(to-r, purple.300, pink.300)"
                  textTransform={'uppercase'}
                  letterSpacing={1.1}
                  fontWeight="semibold"
                  //isLoading={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  size="md"
                  type="submit"
                  color={mode('white', 'pink.800')}
                  //variant="gradient"
                  //bgGradient="linear(to-r, purple.300, pink.300)"
                  textTransform={'uppercase'}
                  letterSpacing={1.1}
                  fontWeight="semibold"
                  //isLoading={isSubmitting}
                >
                  Save Recipe
                </Button>
              </>
            ) : (
              <Button
                size="md"
                //type="submit"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  changeEditable(true);
                }}
                color={mode('white', 'pink.800')}
                //variant="gradient"
                //bgGradient="linear(to-r, purple.300, pink.300)"
                textTransform={'uppercase'}
                letterSpacing={1.1}
                fontWeight="semibold"
                isLoading={isSubmitting}
              >
                Edit Recipe
              </Button>
            )}
          </HStack>
          <Text size="md">Render Counter: {renderCounter}</Text>
        </VStack>
      </Box>
      {/* <pre>{JSON.stringify(recipe, undefined, 2)}</pre> */}
    </FormProvider>
  );
};
