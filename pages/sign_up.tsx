import { NextPage } from 'next';
import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { useForm } from '../hooks/useForm';

const SignUp: NextPage = () => {
  const initFormData = {username: '', password: '', passwordConfirmation: ''};
  const onSubmit = (formData: typeof initFormData) => {
    axios.post('/api/v1/users', formData)
      .then(() => {
        window.alert('注册成功');
        window.location.href = '/sign_in';
      })
      .catch(error => {
        if (error.response) {
          const response: AxiosResponse = error.response;
          setErrors(response.data);
        }
      });
  };
  const {form, setErrors} = useForm({
    initFormData,
    fields: [
      {label: '用户名', type: 'text', key: 'username'},
      {label: '密码', type: 'password', key: 'password'},
      {label: '确认密码', type: 'password', key: 'passwordConfirmation'}
    ],
    buttons: <button type='submit'>注册</button>,
    onSubmit
  });


  return (
    <>
      <h1>注册</h1>
      {form}
    </>
  );
};

export default SignUp;
