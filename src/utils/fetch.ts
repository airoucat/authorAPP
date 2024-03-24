import { API_BASE_URL } from './constants';
import cookie from 'react-cookies';

const setHeader = (): Record<string, string> => {
  const cookieToken: string = cookie.load('token');
  const header = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${cookieToken}`,
  };
  return header;
};

export const useGetFetch = async <T = any>(
  url = '',
  data: Record<string, string> = {}
): Promise<T> => {
  const baseUrl = API_BASE_URL; // 基础路径
  url = baseUrl + url; // 请求地址的拼接

  let dataStr = ''; // 数据拼接字符串
  Object.keys(data).forEach((key) => {
    dataStr += `${key}=${data[key]}&`;
  });
  if (dataStr !== '') {
    dataStr = dataStr.slice(0, -1);
    url = `${url}?${dataStr}`;
  }

  /* 关于Record<string, string>
  ###?
    Record<K, T> 是 TypeScript 中的一个泛型接口，用于表示一个具有类型 T 值的对象集合，其中每个属性名都是类型 K
  */

  const requestConfig: RequestInit = {
    credentials: 'same-origin',
    method: 'GET',
    headers: {
      ...setHeader(),
    },
    mode: 'cors', // 用来决定是否允许跨域请求  值有 三个 same-origin，no-cors（默认）以及 cores;
    cache: 'default', // 是否缓存请求资源 可选值有 default 、 no-store 、 reload 、 no-cache 、 force-cache 或者 only-if-cached 。
  };
  try {
    const response = await fetch(url, requestConfig);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const usePutFetch = async <T = any>(url = '', data = {}): Promise<T> => {
  const baseUrl = API_BASE_URL; // 基础路径
  url = baseUrl + url; // 请求地址的拼接
  const requestConfig: RequestInit = {
    credentials: 'include',
    method: 'PUT',
    headers: {
      ...setHeader(),
    }, // 根据请求内容不同此处也有不同
    body: JSON.stringify(data),
    mode: 'cors', // 用来决定是否允许跨域请求  值有 三个 same-origin，no-cors（默认）以及 cores;
    cache: 'default', // 是否缓存请求资源 可选值有 default 、 no-store 、 reload 、 no-cache 、 force-cache 或者 only-if-cached 。
  };

  try {
    const response = await fetch(url, requestConfig);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    throw new Error(String(error));
  }
};
