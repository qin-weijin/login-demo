import axios from 'axios';
import { message as $message } from 'ant-design-vue';

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

export function login(data: API.LoginParams) {
  return request<BaseResponse<API.LoginResult>>({
    url: 'login',
    method: 'post',
    data
  }, false);
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




const baseApiUrl = "https://nest-api.buqiyuan.site/api/admin/"
export const request = async <T = any>(config: AxiosRequestConfig, isGetDataDirectly = true): Promise<T> => {
  try {
    config.url = `${baseApiUrl + config.url}`
    const res = await service.request(config);
    return isGetDataDirectly ? res.data : res    
  } catch(error: any) {
    return Promise.reject(error);
  }
}