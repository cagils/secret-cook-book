import AddRecipeForm from '../components/create-recipe/AddRecipeForm';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import SidebarLayout from '../components/layouts/sidebar/SidebarLayout';

const CreateRecipePage = () => {
  return <AddRecipeForm />;
};

export default CreateRecipePage;

CreateRecipePage.getLayout = (page) => {
  return page;
  /*   return (
    <PrimaryLayout>
      <SidebarLayout />
      {page}
    </PrimaryLayout>
  ); */
};
