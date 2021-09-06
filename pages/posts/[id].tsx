import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { getDatabaseConnection } from '../../lib/getDatabaseConnection';
import { Post } from '../../src/entity/Post';
import marked from 'marked'

interface Props {
  post: Post
}

const PostsShow: NextPage<Props> = (props) => {
  const {post} = props
  return (
    <>
      <div className='wrapper'>
        <h1>{post.title}</h1>
        <article className='markdown-body' dangerouslySetInnerHTML={ {__html: marked(post.content)} }/>
      </div>
      <style jsx>{`
        .wrapper{
          margin: 16px auto;
          max-width: 800px;
          padding: 0 16px;
        }
        h1 {
          border-bottom: 1px solid #666;
          padding-bottom: 16px;
        }  
      `}</style>
    </>
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
