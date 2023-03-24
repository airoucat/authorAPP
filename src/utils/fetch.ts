import {API_BASE_URL} from './constants'

export const request = async<T = any>(url = '', data = {}, type = 'GET'):Promise<T> => {
  const baseUrl = API_BASE_URL // 基础路径
  type = type.toUpperCase(); // 请求方式小写转换成大写
  url = baseUrl + url; // 请求地址的拼接

  if (type == 'GET') {
      let dataStr = ''; //数据拼接字符串
      Object.keys(data).forEach(key => {
          dataStr += key + '=' + data[key] + '&';
      })
      if (dataStr !== '') {
          dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
          url = url + '?' + dataStr;
      }
  }

  const requestConfig:RequestInit = {
      credentials: 'same-origin',
      method: type,
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      mode: "cors", // 用来决定是否允许跨域请求  值有 三个 same-origin，no-cors（默认）以及 cores;
      cache: 'force-cache' // 是否缓存请求资源 可选值有 default 、 no-store 、 reload 、 no-cache 、 force-cache 或者 only-if-cached 。
  }

  if (type == 'POST') {
      Object.defineProperty(requestConfig, 'body', {
          value: JSON.stringify(data)
      })
  }
  try {
      const response = await fetch(url, requestConfig);
      const responseJson = await response.json();
      return responseJson
  } catch (error) {
      throw new Error(error)
  }
}

export const useGetFetch = async<T = any>(url = '', data = {}):Promise<T> => {
    const baseUrl = API_BASE_URL // 基础路径
    url = baseUrl + url; // 请求地址的拼接

   
  
    let dataStr = ''; //数据拼接字符串
    Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&';
    })
    if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
        url = url + '?' + dataStr;
    }
  
    const requestConfig:RequestInit = {
        credentials: 'same-origin',
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json'
        },
        mode: "cors", // 用来决定是否允许跨域请求  值有 三个 same-origin，no-cors（默认）以及 cores;
        cache: 'force-cache' // 是否缓存请求资源 可选值有 default 、 no-store 、 reload 、 no-cache 、 force-cache 或者 only-if-cached 。
    }
    try {
        const response = await fetch(url, requestConfig);
        const responseJson = await response.json();
        return responseJson
    } catch (error) {
        throw new Error(error)
    }
  }

export const usePostFetch = async<T = any>(url = '', data = {}):Promise<T> => {
const baseUrl = API_BASE_URL // 基础路径
url = baseUrl + url; // 请求地址的拼接
console.log(JSON.stringify(data))
const requestConfig:RequestInit = {
    credentials: 'include',
    method: 'POST',
    headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json'
    },//根据请求内容不同此处也有不同
    body: JSON.stringify(data),
    mode: "cors", // 用来决定是否允许跨域请求  值有 三个 same-origin，no-cors（默认）以及 cores;
    cache: 'force-cache' // 是否缓存请求资源 可选值有 default 、 no-store 、 reload 、 no-cache 、 force-cache 或者 only-if-cached 。
}

try {
    const response = await fetch(url, requestConfig);
    const responseJson = await response.json();
    return responseJson
} catch (error) {
    throw new Error(error)
}
}