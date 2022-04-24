import Ingredients from '../components/create-recipe/Ingredients/Ingredients';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import SidebarLayout from '../components/layouts/sidebar/SidebarLayout';

const CreateRecipePage = () => {
  return (
    <section>
      <h2>Create Recipe Page</h2>
      <p>Creating....</p>
      <Ingredients></Ingredients>
    </section>
  );
};

export default CreateRecipePage;

CreateRecipePage.getLayout = (page) => {
  return (
    <PrimaryLayout>
      <SidebarLayout />
      {page}
    </PrimaryLayout>
  );
};
