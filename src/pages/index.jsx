import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import SidebarLayout from '../components/layouts/sidebar/SidebarLayout';
import AddRecipeForm from '../components/create-recipe/AddRecipeForm/AddRecipeForm';

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// export const getServerSideProps = async (ctx) => {
//   // const recipe = await getRecipe();
//   // return {
//   //   props: {
//   //     recipe,
//   //   },
//   // };
// };

export default function Home(props) {
  const { recipe } = props;
  return (
    <section className="">
      <h1>
        Welcome to <a href="https://nextjs.org">Next JS</a>
      </h1>
      <AddRecipeForm />
    </section>
  );
}

Home.getLayout = (page) => {
  return page;
  /*   return (
    <PrimaryLayout>
      <SidebarLayout />
      {page}
    </PrimaryLayout>
  ); */
};
