// expire 登录 token 有效期默认为七天
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

export const createStorage = ({ prefixKey = '', storage = localStorage } = {}) => {
  const Storage = class {
    private storage = storage;
    private getKey(key: string) { return key.toUpperCase() }

    // 获取本地缓存某项
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
    // 设置本地缓存某项
    set(key: string, value: any, expire: number | null = DEFAULT_CACHE_TIME) {
      const stringData = JSON.stringify({
        value,
        expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
      });
      this.storage.setItem(this.getKey(key), stringData);
    }

    // 删除本地缓存某项
    remove(key: string) { this.storage.removeItem(this.getKey(key)); }

    // 清空本地缓存
    clear(): void { this.storage.clear(); }
  }
  return new Storage();    
}
export const Storage = createStorage();
export default Storage;