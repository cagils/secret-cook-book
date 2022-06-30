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
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import { produce, setAutoFreeze } from 'immer';
import ImageNext from 'next/image';
import { Router, useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { random } from '../../lib/tools';
import { OverlayFader } from '../helpers/OverlayFader';
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
      //setInstanceKey((prev) => random(prev));
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
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onFormSubmit, onFormError)}>
        <VStack
          align="center"
          justify="center"
          px={{ base: '1', sm: '1', md: '2', xl: '3', '2xl': '4' }}
          pb={4}
        >
          <Box
            boxShadow="base"
            //width="full"
            align="center"
            justify="center"
            bgColor={mode('whiteAlpha.800', 'blackAlpha.500')}
            //bgGradient={mode('linear(to-r, purple.50, pink.200)')}
            borderRadius="lg"
            p={4}
            mt={4}
            width="full"
            //px={16}
            position="relative"
            overflow="hidden"
          >
            <OverlayFader active={loading} />
            <Heading
              as="h2"
              size="2xl"
              textAlign="center"
              color={mode('pink.500', 'pink.200')}
              letterSpacing="wide"
              fontWeight="bold"
              textDecoration="underline"
              textUnderlineOffset={'0.05em'}
              textDecorationThickness="2px"
              textDecorationColor={mode('purple.300', 'purple.400')}
              fontStyle="italic"
              // textTransform={'uppercase'}
            >
              {recipe?.title || 'Loading...'}
            </Heading>
          </Box>

          <Flex
            wrap="wrap-reverse"
            //width="full"
            //align="stretch"
            justify="center"
            rowGap={2}
            columnGap={2}
            //px={{ sm: 2, md: 4, lg: 6 }}
            spacing={0}
          >
            <VStack
              boxShadow="base"
              // borderWidth="thin"
              borderColor="pink.200"
              bgColor={mode('whiteAlpha.900', 'blackAlpha.500')}
              //pos="relative"
              //overflow="hidden"
              borderRadius="lg"
              //flexGrow="1"
              flex="2"
              //width="30%"
            >
              <Box
                p={8}
                grow="1"
                alignSelf="stretch"
                pos="relative"
                overflow="hidden"
                // border="1px solid red"
              >
                <OverlayFader active={loading} />
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
              align="stretch"
              justify="center"
              // flexGrow={100}
              rowGap={2}
              columnGap={2}
              spacing={0}
              flex="5"
              //minWidth="98%"
              //maxWidth="80vh"
              //height="100%"
              minW="800px"
            >
              <Flex
                p={0}
                borderRadius="lg"
                boxShadow="base"
                bgColor={mode('whiteAlpha.900', 'blackAlpha.500')}
                //align="center"
                //justify="center"
                pos="relative"
                overflow="hidden"
                //maxHeight="30vh"
                //height="full"
                //width="full"
                align="center"
                justify="center"
                //max="40vh"
                // minW="90%"
              >
                <OverlayFader active={loading} />
                {recipe?.photo && (
                  <Flex
                    align="center"
                    justify="center"
                    /* w={{
                      xl: '100%',
                      '2xl': '80%',
                      '3xl': '75%',
                    }} */
                  >
                    <Box
                      bgGradient={mode(
                        'linear(to-r, purple.200, pink.200)',
                        'linear(to-r, purple.800, pink.600)'
                      )}
                      p={{ sm: '4px', md: '6px', xl: '8px' }}
                      //m={{ sm: '2px', md: '4px', xl: '6px' }}
                      borderRadius="lg"
                    >
                      <Flex
                        align="center"
                        justify="center"
                        grow="1"
                        //bgColor="orange"
                        //display="flex"
                        //flex="1"
                        //pos="relative"
                        //css="aspect-ratio: 1 / 1"
                        overflow="hidden"
                        borderRadius="lg"
                        height="auto"
                      >
                        <Image
                          //loading="lazy"
                          // sizes="50vw"
                          src={recipe?.photo}
                          alt={'Recipe Photo'}
                          layout="fill"
                          fit="cover"
                          width="100%"
                          //height="40vh"
                          minH="20rem"
                          maxH="60rem"
                          //htmlHeight="100%"
                          //htmlWidth="100%"
                          //objectPosition={'50% 50%'}
                          //sx={{ aspectRatio: '16 / 9' }}
                        />
                      </Flex>
                    </Box>
                  </Flex>
                )}
              </Flex>
              <Box
                align="center"
                justfiy="center"
                flex="1"
                p={8}
                //overflow="hidden"
                borderRadius="lg"
                boxShadow="base"
                //borderWidth="thin"
                //borderColor="purple.800"
                bgColor={mode('whiteAlpha.900', 'blackAlpha.500')}
              >
                <Box align="start" mb={8}>
                  <Text
                    pb={4}
                    sx={{
                      '&::first-letter': {
                        fontSize: '1.6em',
                        //color: mode('pink.500', 'pink.200'),
                        fontFamily: 'title',
                        fontWeight: 'thin',
                        //textShadow: '0px 0px 2px rgba(120,120,120,0.8)',
                        letterSpacing: '3px',
                      },
                      textIndent: '1em',
                    }}
                    fontStyle="italic"
                    fontSize="lg"
                    fontFamily={`"Nunito"`}
                  >
                    {recipe?.shortDesc}
                  </Text>
                  <Divider borderColor="pink.200" />
                </Box>
                <Box
                  pos="relative"
                  m={4}
                  align="start"
                  dangerouslySetInnerHTML={{
                    __html: recipe?.description?.html,
                  }}
                ></Box>
                <Box>🚧 UNDER CONSTRUCTION 🚧</Box>
              </Box>
            </VStack>
          </Flex>
          <HStack
            boxShadow="base"
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
            <Button
              size="md"
              type="submit"
              color={mode('white', 'pink.800')}
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
      {/* <pre>{JSON.stringify(recipe, undefined, 2)}</pre> */}
    </FormProvider>
  );
};
