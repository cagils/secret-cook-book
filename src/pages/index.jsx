import { Recipe } from '../components/Recipe/Recipe';

export default function Home(props) {
  return (
    <section className="">
      <h1>
        Welcome to <a href="https://nextjs.org">Next JS</a>
      </h1>
      <Recipe />
    </section>
  );
}

Home.getLayout = (page) => {
  return page;
};
