/**
 * login 登录时 POST 到服务器, 返回 token
 * setToken 给 token 添加有效期并储存到本地缓存
 * afterLogin 登录后获取用户信息
*/
import { defineStore } from 'pinia';
import { Storage } from '@/utils/Storage.ts';
import { login, logout } from '@/utils/request.ts';

interface UserState {
  token: string;
  name: string;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState  => ({
    token: Storage.get('ACCESS_TOKEN'),
    name: 'amdin',
    avatar: '',
    perms: [],
    menus: [],
    userInfo: {},
  }),
  getters: {
    getToken(): string { return this.token; },
    getName(): string { return this.name; },      
  },
  actions: {
    setToken(token: string) {
      this.token = token ?? '';
      const ex = 7 * 24 * 60 * 60 * 1000;
      Storage.set('ACCESS_TOKEN', this.token, ex);
    },
    async login<T = any>(params: API.LoginParams): Promise<T> {
      try {
        const { data } = await login(params);
        this.setToken(data.token);
        return this.afterLogin();
      } catch (error) { return Promise.reject(error); }
    },
    async afterLogin() {},
    /** 登出 */
    async logout() {
      // await logout();
      this.resetToken();
    },
    /** 清空用户信息 */
    resetToken() {
      this.avatar = this.token = this.name = '';
      this.perms = [];
      this.menus = [];
      this.userInfo = {};
      Storage.clear();      
    }
  }
})