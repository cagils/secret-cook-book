import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import SidebarLayout from '../components/layouts/sidebar/SidebarLayout';
import AddRecipeForm from '../components/create-recipe/AddRecipeForm/AddRecipeForm';

export default function Home() {
  return (
    <section className="bg-gradient-to-r from-cyan-500 to-blue-500">
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
