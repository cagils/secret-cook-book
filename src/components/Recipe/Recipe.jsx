import { Box, Button, Heading, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Ingredients } from '../Ingredients/Ingredients';

export const Recipe = ({ editable, recipeId }) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext();

  const onFormError = (data) => {
    alert(JSON.stringify(data, undefined, 2));
  };

  const onFormSubmit = (data) => {
    alert(JSON.stringify(data, undefined, 2));
  };

  const onSubmit = handleSubmit(onFormSubmit, onFormError);

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let abort = false;
    setLoading(true);

    const loadRecipe = async () => {
      const fetchUrl = `/api/my/recipes/${recipeId}`;
      console.log(`fetching ${fetchUrl}`);
      const response = await fetch(fetchUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (abort) return;
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      let res = await response.json();
      setRecipe(res.data);
      setLoading(false);
    };

    loadRecipe();

    return () => {
      abort = true;
    };
  }, [recipeId]);

  if (loading) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  } else {
    return (
      <form onSubmit={onSubmit}>
        <Heading>{recipe.title}</Heading>
        {Boolean(recipe) && (
          <Ingredients editable={editable} ingredients={recipe.ingredients} />
        )}

        <Box my="8px" align="end">
          <Button
            type="submit"
            color="white"
            variant="gradient"
            bgGradient="linear(to-r, purple.300, pink.300)"
            isLoading={isSubmitting}
          >
            Save Recipe
          </Button>
        </Box>
      </form>
    );
  }
};
