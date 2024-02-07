# 登录功能演示

本例展示了登录功能的实现过程。
通过 Axios 从服务器中获取验证码和提交用户登录数据。
本地缓存 Window Storage 接收通过服务器验证后返回的 token，记录用户登录状态。
Pina 创建用户状态对象。

## 技术栈

| Methods        | Description |
| -------------- | ----------- |
| Vue            | 渐进式 JavaScript 框架，实现双向绑定 |
| Vue Router     | 路由 |
| Pinia          | 状态管理 |
| Axios          | 基于 Promise 的 HTTP 请求库 |
| Storage        | 本地缓存 |
| Ant Design Vue | 基于 Ant Design 规范的 Vue UI 库 |
| UnoCSS         | 实现原子化的 CSS 库 |

## 项目目录

```
src  
|- router
|- store
|  └- user.ts
|- utils
|  |- awaitTo.ts - Promise 处理
|  |- request.ts
|  └- Storage.ts
|- views
|  |- welcome.vue
|  └- login.vue
|- App.vue
└- main.ts
```

## 登录前 Login 页 `@/views/login`

页面加载时和点击验证码图片时调用，发送 Axios 请求获取验证码图片。
```
const setCaptcha = async () => {
  try {
    const {img, id} = await getImageCaptcha({ width: 100, height: 50 })      
    state.captcha = img;
    state.formInline.captchaId = id;
  } catch (error) { return Promise.reject(error); }          
}
```
点击登录时提交登录数据，登录成功则跳转路由。
```
const handleSubmit = async () => {
  if(!username && !password && !verifyCode){
    // 验证用户名、密码、验证码合法性。
  }
  const [err] = await userStore.login(state.formInline)
  if (err) {
    message.warning(err)
  } else {
    router.replace({name: 'Welcome'})
  }
}
```
## 登录后 Welcome 页 `@/views/welcome`

点击登出时清除用户数据，跳转路由。
```
const doLogout = async () => {
  await userStore.logout()
  router.replace({ name: 'Login' });
}
```
## 定义 Axios 请求 `@/utils/request`

创建 Axios 实例。
```
import axios from 'axios';
const service = axios.create({ timeout: 6000 })
```

封装请求方法，根据环境变量和 proxy 补全请求地址。

- config - 请求参数
- options
    + isGetDataDirectly - 是否返回 `res.data`
    + isMock - 启用 Mock 数据

```
const baseApiUrl = import.meta.env.VITE_BASE_API;
const baseMockUrl = import.meta.env.VITE_MOCK_API;
export const request = async (config, isGetDataDirectly) => {
  try { 
    const fullUrl = `${(isMock ? baseMockUrl : baseApiUrl) + config.url}`;
    const res = await service.request(config);
    return isGetDataDirectly ? res.data : res    
  } catch(error) { return Promise.reject(error) }
}
```

登录请求

    export function login(data) {
      request({url: 'login', method: 'post', data})
    }

获取验证码请求

    export function getImageCaptcha(params) {
      request({url: 'captcha/img', method: 'get', params})
    }

登出请求

    export function logout() {
      request({url: 'account/logout', method: 'post'})
    }

拦截器，错误码与返回结果处理

    service.interceptors.response.use((response) => {
      if (res.code !== 200) {
        ...
        if (res.code === 11001 || res.code === 11002){
          ...
        }
      } else { return response.data }
    })

## 定义用户状态对象 `@/store/user`



定义用户状态对象，储存用户操作方法和数据。

    import { defineStore } from 'pinia';
    export const useUserStore = defineStore({})

**用户数据**

通过 state 定义用户数据，包括：用户名、头像、参数、用户信息、用户页路由和用户密匙。

    state: ()  => ({
      token: Storage.get('ACCESS_TOKEN'),
      name: 'amdin',
      avatar: '',
      perms: [],
      menus: [],
      userInfo: {},
    })

**操作方法**

通过 actions 定义用户操作方法，包含：登录请求、登出请求、保存密匙、获取用户数据、清空数据。

| Methods           | Description |
| ----------------- | ----------- |
| `login(params)`   | 发送登录请求，返回 token |
| `setToken(token)` | 登陆成功后，将 token 保存到本地缓存 |
| `afterLogin()`    | 登陆成功后，获取用户数据 |
| `logout()`        | 发送登出请求 |
| `resetToken()`    | 登出成功后，清空本地缓存和用户状态对象储存的数据 |

## 本地缓存 `@\utils\Storage`

调用 `Window.localStorage`, 定义本地缓存对象的构造函数和操作方法。

    export const createStorage = (storage = sessionStorage | localStorage) => {
      const Storage = class {};
      return new Storage();
    }
    export const Storage = createStorage();
    export default Storage;

**操作方法**

| Methods                   | Description |
| ------------------------- | ----------- |
| `get(key, def)`           | 获取指定键，不存在返回 def |
| `set(key, value, expire)` | 设置指定键，指定有效期 expire |
| `remove(key)`             | 删除本地缓存指定键 |
| `clear()`                 | 清空本地缓存 |

## Router 路由

重定向 `/` 到 `/login` 登录页

    export const routes = [
      { path: '/', name: 'Layout', redirect: '/login' },
      { path: '/dashboard/welcome', name: 'Welcome', component: () => import('@/views/dashboard/welcome.vue') },
      { path: '/login', name: 'Login', component: () => import('@/views/login.vue') },
    ]

创建导航守卫

- 从本地缓存获取 token
- 存在（已登录），判断 route.to 并重定向到主页。
- 不存在（未登录或过期），判断 route.to 并重定向到登录页。

```
router.beforeEach(async (to, from) => {
  const token = Storage.get('ACCESS_TOKEN');
  if (token){
    if (to.path !== '/dashboard/welcome'){ 
      return {path: '/dashboard/welcome'} 
    } else {
      return true                   // 防止无限重定向
    }
  } else { 
    if ('Login' === to.name) { 
      return true                   // 防止无限重定向
    } else {
      return { name: 'Login', query: { redirect: to.fullPath }, replace: true } 
    }
  }
})
```

## 持续更新

- Welcome 页优化