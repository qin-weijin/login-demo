/* ./util/urlUtils 将路径中重复的正斜杆替换成单个斜杆隔开的字符串 */
export const uniqueSlash = (path: string) => path.replace(/(https?:\/)|(\/)+/g, '$1$2');

/* ./enums/cacheEnum */
export const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';     // 用户token

/**************************************************
 * ./util/request
 * 
 */ 
import axios from 'axios';
import { Storage } from './Storage';          // 本地缓存
const service = axios.create({timeout: 6000})

// 使用环境变量设置请求地址
const baseApiUrl = import.meta.env.VITE_BASE_API;
const baseMockUrl = import.meta.env.VITE_MOCK_API;

// 拦截器
service.interceptors.request.use(
  (config) => {
    // 如果 Storage.ACCESS_TOKEN.expire 在有效期内，则返回 Storage.ACCESS_TOKEN.value
    const token = Storage.get(ACCESS_TOKEN_KEY);
    if (token && config.headers) {
      // 请求头token信息，请根据实际情况进行修改
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => { Promise.reject(error); },
);


// 定义 request(config, options) 函数
export const request = async (config, options) => {
  try {
    // const { successMsg, errorMsg, permCode, isMock, isGetDataDirectly = true } = options;
    // const fullUrl = `${(isMock ? baseMockUrl : baseApiUrl) + config.url}`;
    // config.url = uniqueSlash(fullUrl);
    const res = await service.request(config);        // 发起请求
  } catch (error) { return Promise.reject(error); }
}

/**************************************************
 * ./api/login
 * 
 */ 

export function login(data) {
  return request(
    { 
      url: "https://nest-api.buqiyuan.site/api/admin/login",
      // url: 'login', 
      method: 'post', 
      data, 
    },
    { isGetDataDirectly: false, }
  )
}
export function getImageCaptcha(params) {
  return request(
    { 
      url: "https://nest-api.buqiyuan.site/api/admin/captcha/img",
      method: 'get', 
      params, 
    })
}
