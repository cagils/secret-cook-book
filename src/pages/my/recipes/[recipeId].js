import { enableAllPlugins } from 'immer';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { Recipe } from '@/components/recipe/Recipe';
import { Layout } from '@/layouts/Layout';
import { useEffect, useState } from 'react';

enableAllPlugins();

export async function getServerSideProps(context) {
  // Check if user is authenticated
  const session = await getSession(context);

  // If not, redirect to the homepage
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function RecipePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [recipe, setRecipe] = useState();
  const [loading, setLoading] = useState(false);

  const { recipeId, fresh } = router.query;

  useEffect(() => {
    let abort = false;
    setLoading(true);

    if (!recipeId) {
      console.log('recipeId is not defined. Aborting fetch.');
      return;
    }

    const loadRecipe = async () => {
      const fetchUrl = `/api/recipes/${recipeId}`;
      console.log(`fetching ${fetchUrl}`);
      const response = await fetch(fetchUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (abort) return;
      let res = await response.json();
      console.log('res:');
      console.log(res, undefined, 2);
      if (!response.ok) {
        console.log('response was not ok:', response.status);

        // const redirect = decodeURIComponent(res.return);
        if (response.status == 401) {
          router.push('/');
        }
      }
      console.log('fetched.');
      setRecipe(res.data);
    };

    loadRecipe()
      .then(() => {
        setLoading(false);
        // handleReset();
      })
      .catch((e) => {
        console.log('Error thrown from loadRecipe', e);
      });

    return () => {
      console.log('returning from useEffect fetch');
      abort = true;
    };
  }, [recipeId, router]);

  const saveRecipe = async (body) => {
    const fetchUrl = `/api/recipes/${recipeId}`;
    console.log(`patching ${fetchUrl}`);
    const response = await fetch(fetchUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    console.log('patched.');

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    let res = await response.json();
    setRecipe(res.data);
  };

  return (
    recipe && (
      <Recipe
        initialEditable={fresh == 'true'}
        recipeId={recipeId}
        initialRecipe={recipe}
        user={session?.user}
        saveRecipe={saveRecipe}
      />
    )
  );
}

RecipePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
