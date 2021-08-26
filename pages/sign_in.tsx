import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import React  from 'react';
import axios from 'axios';
import { withSession } from '../lib/withSession';
import { User } from '../src/entity/User';
import { useForm } from '../hooks/useForm';
import qs from 'querystring'

const SignIn: NextPage<{ user: User }> = ({user}) => {
  const {form} = useForm({
    initFormData: {username: '', password: ''},
    fields: [
      {label: '用户名', type: 'text', key: 'username'},
      {label: '密码', type: 'password', key: 'password'}
    ],
    buttons: <button type='submit'>登录</button>,
    submit: {
      request: (formData) => axios.post('/api/v1/sessions', formData),
      success: () => {
        window.alert('登陆成功')
        const query = qs.parse(window.location.search.slice(1))
        window.location.href = query.returnTo.toString();
      }
    }
  })

  return (
    <>
      {user && <div>
        当前登录用户为 {user.username}
      </div>}
      <h1>登录</h1>
      {form}
    </>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    //@ts-ignore
    const user = context.req.session.get('currentUser');
    return {
      props: {
        user: JSON.parse(JSON.stringify(user || ''))
      }
    };
  }
);
