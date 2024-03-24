import React, { useEffect } from 'react';
import { useNavigate, useLocation, matchRoutes } from 'react-router-dom';
import cookie from 'react-cookies';
import { useSelector } from 'react-redux';
import { type InUseUserInfoState } from '../system/interface/user.interface';
import { type RouteConfig } from '../system/interface/route.interface';

interface AuthRouteProps {
  auth: boolean;
  children: React.ReactNode;
  router: RouteConfig[];
}
export const AuthRoute: React.FC<AuthRouteProps> = ({
  auth = false,
  children,
  router,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = cookie.load('token');
  const loginState = useSelector((state: InUseUserInfoState) => {
    return state.auth._id === '000000000000000000000000' || !state.auth._id
      ? 'logout'
      : 'login';
  });
  const mathchs = matchRoutes(router, location);

  const isExist = mathchs?.some((item) => item.pathname === location.pathname);
  useEffect(() => {
    if (!token && auth) {
      navigate('/login');
    }
    // 这里判断条件是：token 存在并且是匹配到路由并且是已经登录的状态
    if (token && isExist && loginState === 'login') {
      const { pathname, search, state } = location;
      navigate(`${pathname}${search}`, { state: { ...state } });
    }
  }, [token, location.pathname]);

  return <>{children}</>;
};
/**
 * ###?
 * matchRoutes用于从路由配置中递归匹配当前路径与路由配置的路径，返回一个包含所有匹配项的数组
 * some是 JavaScript 中的数组方法之一，用于检查数组中是否至少有一个元素满足指定条件，回调函数返回布尔值
 * ###!
 * 怎么获取cookie的其它数据？暂时想到的方法就是localstorage里存一份
 *
 */
