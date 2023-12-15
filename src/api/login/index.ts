import type { BaseResponse } from '@/utils/request';    // code, message, data
import { request } from '@/utils/request';

/**
 * @description 登录
 * @param {LoginParams} data
 * @returns
 */
export function login(data: API.LoginParams) {
  return request<BaseResponse<API.LoginResult>>(
    {
      url: 'login',
      method: 'post',
      data,                         // 作为请求体被发送的数据
    },
    {
      isGetDataDirectly: false,
    },
  );
}
/**
 * @description 获取验证码
 */
export function getImageCaptcha(params?: API.CaptchaParams) {
  return request<API.CaptchaResult>({
    url: 'captcha/img',         // Axios 请求服务器 URL
    method: 'get',
    params,                     // 是与请求一起发送的 URL 参数
  });
}
