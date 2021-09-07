import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextApiRequest, NextPage } from 'next';
import { getDatabaseConnection } from '../../lib/getDatabaseConnection';
import { Post } from '../../src/entity/Post';
import marked from 'marked';
import Link from 'next/link';
import { withSession } from '../../lib/withSession';

interface Props {
  post: Post;
  currentUser: User;
}

const PostsShow: NextPage<Props> = (props) => {
  const {post, currentUser} = props;
  return (
    <>
      <div className='wrapper'>
        <header>
          <h1>{post.title}</h1>
          {currentUser &&
          <p>
            <Link href='/posts/[id]/edit' as={`/posts/${post.id}/edit`}>
              <a>编辑</a>
            </Link>
          </p>}
        </header>
        <article className='markdown-body' dangerouslySetInnerHTML={{__html: marked(post.content)}}/>
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

export const getServerSideProps: GetServerSideProps<any, { id: string }> = withSession(
  async (context: GetServerSidePropsContext) => {
    const connection = await getDatabaseConnection();
    const post = await connection.manager.findOne('Post', context.params.id);
    const currentUser = (context.req as any).session.get('currentUser') || null;

    return {
      props: {
        post: JSON.parse(JSON.stringify(post)),
        currentUser
      }
    };
  }
);
