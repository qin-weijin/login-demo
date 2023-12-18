/*

- type BaseResponse - Promise
- type Response - code, message, data 请求结果类型
- interface RequestOptions - request 选项

**发送请求**

    request(config, options)    // 调用 axios.request() 

- options.permCode 和 useUserStore.perms.permCode - 不存在则终止请求
- 判断 isMock 补全 fullUrl
- 打印成功/失败消息，返回 res.data / res

**创建请求**

- axios.create
- axios.interceptors.request.use - 拦截请求，添加 config.headers.Authorization
- axios.interceptors.response.use - 拦截响应，添加状态码处理

**参数**

- config: AxiosRequestConfig - Axios 配置对象
  + url, method, ...
- options: RequestOptions - Request 选项对象
  + permCode - 权限
  + isGetDataDirectly - return res.data / res
  + successMsg - 请求成功时打印
  + errorrMsg - 请求失败时打印
  + isMock - Mock Data / real Data
*/ 

import axios from 'axios';

// 创建请求
const service = axios.create({timeout: 6000})

export const request = async (config, options) => {
  try {
    const res = await service.request(config);    
  } catch () {}
}