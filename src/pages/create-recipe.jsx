import AddRecipeForm from '../components/AddRecipeForm/AddRecipeForm';

const CreateRecipePage = () => {
  return <AddRecipeForm />;
};

export default CreateRecipePage;

CreateRecipePage.getLayout = (page) => {
  return page;
};
