import React, { useCallback, useState } from 'react';
import { NextPage } from 'next';
import Form from '../../components/Form';
import axios, { AxiosResponse } from 'axios';

const PostsNew: NextPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [errors, setErrors] = useState({
    title: [], content: []
  });

  const onChange = useCallback((key, value) => {
    setFormData({
      ...formData,
      [key]: value
    });
  }, [formData]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    axios.post('/api/v1/posts', formData)
      .then(() => {
        window.alert('提交成功');
      })
      .catch(error => {
        if (error.response) {
          const response: AxiosResponse = error.response;
          setErrors(response.data);
        }
      });
  }, [formData]);
  return (
    <div>
      <Form fields={[
        {
          label: '标题',
          type: 'text',
          value: formData.title,
          onChange: e => onChange('title', e.target.value),
          errors: errors.title
        },
        {
          label: '内容',
          type: 'textarea',
          value: formData.content,
          onChange: e => onChange('content', e.target.value),
          errors: errors.content
        },
      ]} onSubmit={onSubmit} buttons={<>
        <button type='submit'>提交</button>
      </>}/>
    </div>
  );
};

export default PostsNew;
