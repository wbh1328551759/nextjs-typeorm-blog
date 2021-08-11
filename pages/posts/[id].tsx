import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { getDatabaseConnection } from '../../lib/getDatabaseConnection';
import { Post } from '../../src/entity/Post';

interface Props {
  post: Post
}

const PostsShow: NextPage<Props> = (props) => {
  const {post} = props
  return (
    <div>
      <h1>{post.title}</h1>
      <article dangerouslySetInnerHTML={ {__html: post.content} }/>
    </div>
  );
};

export default PostsShow;

export const getServerSideProps: GetServerSideProps<any, {id: string}> = async (context) => {
  const connection = await getDatabaseConnection();
  const post = await connection.manager.findOne(Post, context.params.id)
  return {
    props: {
      post: JSON.parse(JSON.stringify(post))
    }
  };
};
