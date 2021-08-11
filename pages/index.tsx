import styles from '../styles/Home.module.css';
import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { getDatabaseConnection } from '../lib/getDatabaseConnection';
import { Post } from '../src/entity/Post';

interface Props {
  posts: Post[];
}

const Home: NextPage<Props> = (props) => {
  const {posts} = props;
  console.log(posts)

  return (
    <div className={styles.container}>
      {posts.map(post => <div key={post.id}>{post.title}</div>)}
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection()
  const posts = await connection.manager.find(Post)
  console.log(posts[0].createdAt)
  console.log(typeof posts[0].createdAt)

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  };
};
