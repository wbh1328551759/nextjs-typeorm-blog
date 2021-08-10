import styles from '../styles/Home.module.css';
import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { UAParser } from 'ua-parser-js';
import { getDatabaseConnection } from '../lib/getDatabaseConnection';

interface Props {
  browser: {
    name: string;
    version: string;
    major: string;
  }
}

const Home: NextPage<Props> = (props) => {
  const {browser} = props;
  console.log(browser);
  return (
    <div className={styles.container}>
      <h1>你的浏览器是 {browser}</h1>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connect = await getDatabaseConnection()
  console.log('connect')
  const ua = context.req.headers['user-agent'];
  const result = new UAParser(ua).getResult();
  return {
    props: {
      browser: result.ua
    }
  };
};
