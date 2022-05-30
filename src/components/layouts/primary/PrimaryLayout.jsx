import Head from 'next/head';

const PrimaryLayout = ({ children }) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default PrimaryLayout;
