import Navbar from '../Navbar/Navbar';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
