import axios from 'axios';
import { message as $message } from 'ant-design-vue';

export function login(data: API.LoginParams) {
  return request<BaseResponse<API.LoginResult>>({
    url: 'login',
    method: 'post',
    data
  }, { isGetDataDirectly: false });
}

export function getImageCaptcha(params?: API.CaptchaParams) {
  return request<API.CaptchaResult>({
    url: 'captcha/img',
    method: 'get',
    params,
  });
}
export function logout() {
  return request({
    url: 'account/logout',
    method: 'post',
  });
}

const service = axios.create({ timeout: 6000 })

service.interceptors.response.use((response) => {
  const res = response.data;
  if (res.code !== 200) {
    $message.error(res.message)
    if (res.code === 11001 || res.code === 11002) {
      window.localStorage.clear();
      window.location.reload();      
    }
    return Promise.reject(error);
  } else { return res }
})

/** 真实请求的路径前缀 */
const baseApiUrl = import.meta.env.VITE_BASE_API;
/** mock请求路径前缀 */
const baseMockUrl = import.meta.env.VITE_MOCK_API;

export const request = async <T = any>(config: AxiosRequestConfig, options: RequestOptions = {},): Promise<T> => {
  try {
    const {isMock = false, isGetDataDirectly = true} = options;
    config.url = `${(isMock ? baseMockUrl : baseApiUrl) + config.url}`;
    const res = await service.request(config);
    return isGetDataDirectly ? res.data : res    
  } catch(error: any) {
    return Promise.reject(error);
  }
}