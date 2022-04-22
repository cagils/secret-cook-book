import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import SidebarLayout from '../components/layouts/sidebar/SidebarLayout';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <section className={styles.main}>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Next JS</a>
      </h1>
    </section>
  );
}

Home.getLayout = (page) => {
  return (
    <PrimaryLayout>
      <SidebarLayout />
      {page}
    </PrimaryLayout>
  );
};
