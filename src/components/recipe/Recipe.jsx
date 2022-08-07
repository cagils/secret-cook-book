import { Box, Button, Flex, useColorMode, VStack } from '@chakra-ui/react';

import { produce, setAutoFreeze } from 'immer';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { OverlayFader } from '@/components/helpers/OverlayFader';
import { Ingredients } from '@/components/ingredients/Ingredients';
import { Description } from '@/components/recipe/Description';
import { Photo } from '@/components/recipe/Photo';
import { RecipeTitle } from '@/components/recipe/RecipeTitle';
import { ShortDesc } from '@/components/recipe/ShortDesc';
import { useEscape } from '@/lib/hooks/useEscape';
import { random } from '@/lib/tools';
import { OrnamentDivider } from '@/resources/svgs';

setAutoFreeze(false);

export const Recipe = ({
  initialEditable,
  initialRecipe,
  saveRecipe,
  deleteRecipe,
  user,
  handleUploadPicture,
}) => {
  // const renderCounter = useRenderCounter();
  const [editable, setEditable] = useState(initialEditable);
  const { colorMode } = useColorMode();
  const mode = (lightValue, darkValue) =>
    colorMode == 'light' ? lightValue : darkValue;
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState(initialRecipe?.ingredients);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [instanceKey, setInstanceKey] = useState(random());

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

  useEffect(() => {
    setIngredients(initialRecipe?.ingredients);
  }, [initialRecipe]);

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

  const changeEditable = useCallback((value) => {
    console.log('value', value);
    setEditable(value);
  }, []);

  const handleEdit = useCallback(() => {
    setEditable(true);
  }, []);

  const cancelEdit = useCallback(() => {
    setEditable(false);
  }, []);

  const onEscape = useCallback(() => {
    setEditable(false);
  }, []);
  useEscape(onEscape);

  const _saveRecipe = async () => {
    changeEditable(false);

    // const formValues = getValues();

    // console.log('SAVE RECIPE: ');
    // console.log('formValues:');
    // console.log(JSON.stringify(formValues, undefined, 2));

    const formStateIngredients = formStateIngredientsTransform();
    console.log('formStateIngredients:');
    console.log(JSON.stringify(formStateIngredients, undefined, 2));

    const formStateDescription =
      getValues()?.description?.text || initialRecipe?.description?.text;
    const formStateShortDesc =
      getValues()?.shortDesc || initialRecipe?.shortDesc;
    const formStateTitle = getValues()?.title || initialRecipe?.title;

    const body = {
      title: formStateTitle,
      shortDesc: formStateShortDesc,
      description: { text: formStateDescription },
      ingredients: formStateIngredients,
    };
    await saveRecipe(body);
  };

  const onFormSubmit = async (data) => {
    console.log('ON FORM SUBMIT');
    setIsSubmitting(true);
    setLoading(true);

    try {
      console.log(data);
      await _saveRecipe();
      console.log('SAVED!');
    } catch (e) {
      console.log('error', e);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
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
          alignItems="center"
          justifyContent="center"
          px={{ base: '2', sm: '2', md: '4', xl: '5', '2xl': '5' }}
          pb={4}
          spacing={0}
          gap={4}
        >
          <Box
            boxShadow={mode('base', 'baseWhite')}
            //width="full"
            alignItems="center"
            justifyContent="center"
            bgColor={mode('whiteAlpha.800', 'blackAlpha.500')}
            //bgGradient={mode('linear(to-r, purple.50, pink.200)')}
            borderRadius="lg"
            px={4}
            py={4}
            mt={8}
            width="full"
            //px={16}
            position="relative"
            overflow="hidden"
          >
            <RecipeTitle
              recipeTitle={initialRecipe?.title}
              editable={editable}
              loading={loading}
              handleEdit={handleEdit}
            />
            <OverlayFader active={loading} />
          </Box>
          <Flex
            //width="full"
            alignItems="stretch"
            justifyContent="center"
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
              alignItems="stretch"
              justifyContent="center"
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
                flex="1"
                p={{ base: '4px', sm: '6px', md: '8px', xl: '10px' }}
                borderRadius="lg"
                boxShadow={mode('base', 'baseWhite')}
                bgColor={mode('whiteAlpha.900', 'blackAlpha.500')}
              >
                <Photo
                  editable={editable}
                  photoUrl={initialRecipe?.photo}
                  user={user}
                  recipeId={initialRecipe?.recipeId}
                  handleUploadPicture={handleUploadPicture}
                />
                <Flex
                  direction={'column'}
                  alignItems="center"
                  justifyContent="center"
                  mt="8"
                >
                  <Box width="full">
                    <ShortDesc
                      shortDesc={
                        initialRecipe?.shortDesc?.replace(/\\n/g, '\n') || ''
                      }
                      editable={editable}
                      loading={loading}
                    />
                  </Box>
                  <Box>
                    <OrnamentDivider
                      height="5em"
                      fill={mode(
                        'var(--chakra-colors-pink-400)',
                        'var(--chakra-colors-pink-500)'
                      )}
                    />
                  </Box>
                </Flex>
                <Description
                  editable={editable}
                  description={
                    initialRecipe?.description?.text.replace(/\\n/g, '\n') || ''
                  }
                  loading={loading}
                />
              </Box>
              <OverlayFader active={loading} />
            </VStack>
          </Flex>
          <Box
            boxShadow={mode('base', 'baseWhite')}
            //borderWidth="thin"
            borderColor="pink.200"
            bgColor={mode('whiteAlpha.900', 'blackAlpha.500')}
            width="full"
            alignItems="end"
            justifyContent="center"
            //bgColor={mode('whiteAlpha.400', 'blackAlpha.400')}
            borderRadius="lg"
            p={4}
            mt={4}
          >
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
              onClick={(e) => {
                e.preventDefault();
                deleteRecipe();
              }}
              mx="2"
            >
              Delete
            </Button>
            {editable ? (
              <>
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
                  onClick={(e) => {
                    e.preventDefault();
                    cancelEdit();
                  }}
                  mx="2"
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
                  mx="2"
                >
                  Save
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
                Edit
              </Button>
            )}
          </Box>
          {/* <Text size="md">Render Counter: {renderCounter}</Text> */}
        </VStack>
      </Box>
      {/* <pre>{JSON.stringify(recipe, undefined, 2)}</pre> */}
    </FormProvider>
  );
};
