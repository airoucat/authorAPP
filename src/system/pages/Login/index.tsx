import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import { usePutFetch } from '@/utils/fetch';
import { API_LOGIN } from '@/utils/constants';
import { setToken, setUser } from '@/features/auth.slice';
import { useDispatch } from 'react-redux';
import styles from './index.module.scss';
import Loading from '../../components/Loading';

interface LoginInfo {
  username: string;
  password: string;
  remember: boolean;
}

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (v: LoginInfo): void => {
    setLoading(true);
    usePutFetch(API_LOGIN, v)
      .then((res) => {
        const userInfo = { ...res.data };
        const { accessToken, expiresIn, user } = userInfo;
        dispatch(setToken({ token: accessToken, expiresIn }));
        dispatch(setUser({ ...user }));
        navigate('/home');
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Loading loading={loading} size='large' />
      <div className={styles.loginContainer}>
        <Form form={form} initialValues={{ remember: true }} onFinish={handleSubmit}>
          <Form.Item
            label='用户名'
            name='username'
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder='请输入用户名' />
          </Form.Item>

          <Form.Item
            label='密码'
            name='password'
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder='请输入密码' />
          </Form.Item>

          <Form.Item name='remember' valuePropName='checked'>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
