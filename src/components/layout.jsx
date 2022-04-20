import React, { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Layout = ({ children, title = 'Layout Page Title' }) => (
  <>
    <main>{children}</main>
  </>
);

export default Layout;
