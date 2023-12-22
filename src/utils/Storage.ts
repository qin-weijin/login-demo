/**************************************************
 * ./store/module/user 创建本地缓存对象
*/ 

import { defineStore } from 'pinia'
export const useUserStore = defineStore({
  id: 'user',
  state: () => ({}),
  getters: {},
  actions: {
    async login(params) {      
      try {
        const {data} = await login(params)
      } catch (error) { return Promise.reject(error); }
    }
  },
})

/**************************************************
 * ./utils/Storage 创建本地缓存对象
*/ 
export const createStorage = ({ prefixKey = '', storage = localStorage } = {}) => {
  // 构造函数 Storage
  const Storage = class {
    /**
     * 读取缓存
     * @param key 指定要获取的键
     * @param def 不存在指定键时返回默认值
     */
    get<T = any>(key: string, def: any = null): T {
      const item = this.storage.getItem(this.getKey(key));
      if (item) {
        try {
          const data = JSON.parse(item);
          const { value, expire } = data;
          // expire 在有效期内返回键值
          if (expire === null || expire >= Date.now()) { return value; }
          this.remove(this.getKey(key));
        } catch (e) { return def; }
      }
      return def;
    }
  }
  return new Storage();
};    
export const Storage = createStorage();
export default Storage;