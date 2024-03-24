import React from 'react';
// import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from '@/system/pages/Login';
import EditPage from '@/content/pages/EditPage';
import Home from '@/content/pages/Home';

import Navbar from '@/system/components/Navbar';
import { AuthRoute } from '@/router/AuthRoute';
import { type RouteConfig } from '../system/interface/route.interface';

const RootRoute: React.FC = () => {
  const router = [
    { path: '/login', element: <Login /> },
    {
      element: <Navbar />,
      auth: true,
      children: [
        { path: '/home', element: <Home />, auth: true },
        { path: '/edit', element: <EditPage />, auth: true },
        // { path: "*", element: <NotFound />, auth: true },
      ],
    },
  ];

  const RouteArry = (routeList: RouteConfig[]): JSX.Element[] => {
    return routeList.map((item) => {
      return (
        <Route
          path={item.path}
          element={
            <AuthRoute auth={!!item.auth} key={item.path} router={routeList}>
              {item.element}
            </AuthRoute>
          }
          key={item.path}
        >
          {/* 递归调用，因为可能存在多级的路由 */}
          {item?.children && RouteArry(item.children)}
        </Route>
      );
    });
  };
  return (
    <Router>
      <Routes>{RouteArry(router)}</Routes>
    </Router>
  );
};
export default RootRoute;
