import AddRecipeForm from '../components/AddRecipeForm/AddRecipeForm';

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
};
