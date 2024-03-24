import React, { Children } from 'react';
import { Layout, Menu } from 'antd';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { type InUseUserInfoState } from '@/system/interface/user.interface';
import styles from './index.module.scss';

const { Header } = Layout;

const Navbar: React.FC = () => {
  const userInfo = useSelector((state: InUseUserInfoState) => {
    return state.auth;
  });
  const { username } = userInfo;
  return (
    <>
      <Header className={styles.header}>
        <div className={styles.userInfo}>{username}</div>
      </Header>
      <Outlet />
    </>
  );
};

export default Navbar;

/**
 * ###?
 * Outlet 组件是一个占位符，告诉 React Router 嵌套的内容应该放到哪里
 */
