/**
 *  useUserStore
 * login 登录时 POST 到服务器, 返回 token
 * setToken 给 token 添加有效期并储存到本地缓存
*/
import { defineStore } from 'pinia';
import axios from 'axios';

interface UserState {
  token: string;
  name: string;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState  => ({
    token: Storage.get('ACCESS_TOKEN'),
    name: 'amdin',
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
    async login<T = any>(data: API.LoginParams): Promise<T> {
      try {
        const res = await axios.post('https://nest-api.buqiyuan.site/api/admin/login', data)
        this.setToken(res.data.data.token);
        return this.afterLogin();
      } catch (error) { return Promise.reject(error); }
    },
    async afterLogin() {}
  }
})

// Storage

// 默认 expire 为7天
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

export const createStorage = ({ prefixKey = '', storage = localStorage } = {}) => {
  const Storage = class {
    private storage = storage;
    private getKey(key: string) { return key.toUpperCase() }
    /**
     * @description 获取 Storage.ACCESS_TOKEN 对比有效期
     * @param 设置不存在或不在有效期时返回
     */
    get<T = any>(key: string, def: any = null): T {
      const item = this.storage.getItem(this.getKey(key))
      if (item) {
        try {
          const data = JSON.parse(item);
          const { value, expire } = data;
          if (expire === null || expire >= Date.now()) {
            return value;
          }
          this.storage.removeItem(this.getKey(key));
        } catch (e) {
          return def;
        }
      }
      return def;
    }
    /**
     * @description 设置缓存
     * @param {string} key 缓存键
     * @param {*} value 缓存值
     * @param expire
     */
    set(key: string, value: any, expire: number | null = DEFAULT_CACHE_TIME) {
      const stringData = JSON.stringify({
        value,
        expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
      });
      this.storage.setItem(this.getKey(key), stringData);
    }
  }
  return new Storage();    
}
export const Storage = createStorage();
export default Storage;
