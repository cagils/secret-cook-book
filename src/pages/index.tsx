import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { GetStaticProps } from 'next';
import TestComp from '../components/TestComp';

export default function Home() {
  return (
    <div>
      <TestComp />
    </div>
  );
}
