import { defineStore } from 'pinia';
// import { useWsStore } from './ws';
import type { RouteRecordRaw } from 'vue-router';
import { store } from '@/store';
import { login } from '@/api/login';
import { ACCESS_TOKEN_KEY } from '@/enums/cacheEnum';
import { Storage } from '@/utils/Storage';
// import { logout, getInfo, permmenu } from '@/api/account';
// import { generatorDynamicRouter } from '@/router/generator-router';
import { resetRouter } from '@/router';

interface UserState {
  token: string;
  name: string;
  avatar: string;
  // like [ 'sys:user:add', 'sys:user:update' ]
  perms: string[];
  menus: RouteRecordRaw[];
  userInfo: Partial<API.AdminUserInfo>;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: Storage.get(ACCESS_TOKEN_KEY, null),
    name: 'amdin',
    avatar: '',
    perms: [],
    menus: [],
    userInfo: {},    
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getAvatar(): string {
      return this.avatar;
    },
    getName(): string {
      return this.name;
    },
    getPerms(): string[] {
      return this.perms;
    },    
  },
  actions: {
    /** 清空token及用户信息 */    
    resetToken() {},
    /** 登录成功保存token */
    setToken(token: string) {
      this.token = token ?? '';
      const ex = 7 * 24 * 60 * 60 * 1000;
      Storage.set(ACCESS_TOKEN_KEY, this.token, ex);
    },

    async login(params: API.LoginParams) {
      try {
        const { data } = await login(params); // Axios post login, data = res
        this.setToken(data.token);            // 
        return this.afterLogin();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /** 登录成功之后, 获取用户信息以及生成权限路由 */
    async afterLogin() {},
    /** 登出 */
    async logout() {}
  }
})

// 在组件setup函数外使用
export function useUserStoreWidthOut() {
  return useUserStore(store);  
}