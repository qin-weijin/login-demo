/**
 * 创建本地缓存对象
 * @param {string=} prefixKey - 前缀
 * @param {Object} [storage=localStorage] - sessionStorage | localStorage - 储存
 */
export const createStorage = ({ prefixKey = '', storage = localStorage } = {}) => {
  /**
   * 本地缓存类
   * @class Storage
   */
  const Storage = class {
    private storage = storage;
    private prefixKey?: string = prefixKey;
    // 添加前缀 prefixKey 到 key
    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase();
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

    /**
     * 读取缓存
     * @param {string} key 缓存键
     * @param {*=} def 默认值
     */
    get<T = any>(key: string, def: any = null): T {
      const item = this.storage.getItem(this.getKey(key));
      if (item) {
        try {
          const data = JSON.parse(item);
          const { value, expire } = data;
          // 在有效期内直接返回
          if (expire === null || expire >= Date.now()) {
            return value;
          }
          this.remove(this.getKey(key));
        } catch (e) {
          return def;
        }
      }
      return def;
    }

    remove(key: string) {}
    clear(): void {}
    setCookie(name: string, value: any, expire: number | null = DEFAULT_CACHE_TIME) {}
    getCookie(name: string): string {}
    removeCookie(key: string) {}
    clearCookie(): void {}
  }
  return new Storage();
};
export const Storage = createStorage();

export default Storage