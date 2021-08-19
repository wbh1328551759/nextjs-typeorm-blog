import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import React, { useCallback, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { withSession } from '../lib/withSession';
import { User } from '../src/entity/User';

const SignIn: NextPage<{user: User}> = ({user}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: [], password: []
  });

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    axios.post('/api/v1/sessions', formData)
      .then(() => {
        window.alert('登录成功');
      })
      .catch(error => {
        if (error.response) {
          const response: AxiosResponse = error.response;
          setErrors(response.data);
        }
      });
  }, [formData]);

  return (
    <>
      {user && <div>
        当前登录用户为 {user.username}
      </div>}
      <h1>登录</h1>

      <hr/>
      <form onSubmit={onSubmit}>
        <div>
          <label>用户名
            <input type="text" value={formData.username}
                   onChange={e => setFormData({
                     ...formData,
                     username: e.target.value
                   })}/>
          </label>
          {errors.username?.length > 0 && <div>{errors.username.join(',')}</div>}
        </div>

        <div>
          <label>密码
            <input type="password" value={formData.password}
                   onChange={e => setFormData({
                     ...formData,
                     password: e.target.value
                   })}/>
          </label>
          {errors.password?.length > 0 &&
          <div>{errors.password.join(',')}</div>}
        </div>


        <div>
          <button type='submit'>登录</button>
        </div>
      </form>
    </>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    //@ts-ignore
    const user = context.req.session.get('currentUser')
    return {
      props: {
        user
      }
    };
  }
);
