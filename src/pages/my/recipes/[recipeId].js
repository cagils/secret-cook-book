import { enableAllPlugins } from 'immer';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Recipe } from '@/components/recipe/Recipe';
import { Layout } from '@/layouts/Layout';
import { supabase } from '@/lib/supabase';

enableAllPlugins();

/* export async function getServerSideProps(context) {
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
} */

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

  const deleteRecipe = async (body) => {
    const fetchUrl = `/api/recipes/${recipeId}`;
    console.log(`deleting ${fetchUrl}`);
    const response = await fetch(fetchUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    console.log('deleted.');

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    let res = await response.json();
    router.push('/my/recipes');
  };

  const handleUploadPicture = async (file, oldFileName, fileName) => {
    const { data1, error1 } = await supabase.storage.from('recipe-photos').upload(`public/${fileName}`, file, {
      cacheControl: '1',
      upsert: true,
    });
    if (oldFileName) {
      const { data2, error2 } = await supabase.storage.from('recipe-photos').remove([`public/${oldFileName}`]);
    }
    const { publicURL, error3 } = supabase.storage.from('recipe-photos').getPublicUrl(`public/${fileName}`);

    if (!recipeId || !publicURL) return;
    const fetchUrl = `/api/recipes/${recipeId}`;
    console.log(`patching ${fetchUrl} for photo upload`);
    const response = await fetch(fetchUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patchType: 'photo',
        photo: publicURL,
      }),
    });
    console.log('patched.');

    if (!response.ok) {
      // throw new Error(`Error: ${response.status}`);
      console.log('photo useEffect response not ok', response.status);
    }
    let res = await response.json();

    return publicURL;
  };

  return (
    recipe && (
      <Recipe
        initialEditable={fresh == 'true'}
        initialRecipe={recipe}
        user={session?.user}
        saveRecipe={saveRecipe}
        deleteRecipe={deleteRecipe}
        handleUploadPicture={handleUploadPicture}
      />
    )
  );
}

RecipePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
