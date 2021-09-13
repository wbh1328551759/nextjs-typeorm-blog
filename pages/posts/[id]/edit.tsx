import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useForm } from '../../../hooks/useForm';
import axios from 'axios';
import { getDatabaseConnection } from '../../../lib/getDatabaseConnection';
import { withSession } from '../../../lib/withSession';

type Props = {
  id: number;
  post: Post;
}

const PostEdit: NextPage<Props> = ({id, post}: Props) => {
  const {form} = useForm({
    initFormData: {title: post.title, content: post.content},
    fields: [
      {label: '大标题', type: 'text', key: 'title', className: ''},
      {label: '内容', type: 'textarea', key: 'content', className: ''},
    ],
    buttons: <div className='actions'>
      <button type='submit'>提交</button>
    </div>,
    submit: {
      request: (formData) => axios.patch(`/api/v1/posts/${id}`, formData),
      success: () => {
        window.alert('提交成功');
        window.location.href = '/posts';
      }
    }
  });

  return (
    <div className='postsNew'>
      <div className='form-wrapper'>
        {form}
      </div>

      <style jsx global>{`
        .form-wrapper {
          padding: 16px;
        }
        .postsNew .field-content textarea {
          height: 25em;
          resize: none;
        }
        .postsNew .label-text {
          width: 4em;
          text-align: right;
        }
        .postsNew .actions {
          text-align: center;
          background: #ddd;
          padding: 4px 0;
        }
      `}</style>
    </div>
  );
};

export default PostEdit;

export const getServerSideProps: GetServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    const {id} = context.params;
    const connection = await getDatabaseConnection();
    const post = await connection.manager.findOne('Post', id);
    console.log('post', post)
    return {
      props: {
        id: parseInt(id.toString()),
        post: JSON.parse(JSON.stringify(post))
      }
    };
  });
