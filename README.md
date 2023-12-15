# Login Demo 登录功能演示

## 技术栈

- Vue
- Vue Router
- Pinia
- Axios
- Storage 本地缓存

## 程序入口 `@/main.ts`

- setupPlugins
- setupApp
    + 初始化路由 `setupRouter`

---------------------------------------------------------------------------------------
## 逻辑

首次登录 -> '/' -> 重定向 '/dashboard/welcome' -> 导航守卫验证 ->
-> ！token 且非白名单 -> 
-> next({ name: LOGIN_NAME, query: { redirect: to.fullPath }, replace: true });
-> 携带参数并导航到 Login 页面

## 路由

### `@/router/index.ts`

- 创建和定义路由 `createRouter`、`routes`、`router`
    + 首页 `/dashboard/welcome` 、`@/layout/index.vue`
    + 登录页 `/login`、`@/views/login/index.vue`
- 创建导航守卫 `setupRouter`、`createRouterGuards`
  
### `@/router/router-guards.ts`

定义 createRouterGuards 创建导航守卫。

**beforeEach**

- 获取本地缓存中密匙。 `Storage` `ACCESS_TOKEN_KEY`
- 密匙有效
    + 验证 `LOGIN_NAME` 则跳转 `/dashboard/welcome` 
    + 验证 `userStore.menu` 则跳转
    + 都找不到则返回 `LOGIN_NAME`
- 密匙无效
    + 验证白名单 `whiteNameList` 则跳转
    + 非白名单则返回 `LOGIN_NAME`

---------------------------------------------------------------------------------------
## 实现

**`@/view/login`**

用户首次打开站点将被导航至 Login 登录页。

- `state` - 双向绑定用户输入包括：用户名登录、密码和验证码。
- `setCaptcha` - 在用户点击验证码或提交按钮时获取并重置验证码。
- `handleSubmit` 在用户点击登录按钮时触发。

**`@/store/module/user`**

调用 pinia defineStore 创建 useUserStore 储存用户状态。

- token - 调用 Storage.get 获取本地缓存 ACCESS_TOKEN_KEY
- login(params) - 调用 `@/api/login`

**`@/api/login`**

配置 Axios 请求参数，调用 request(config, options) `@/utils/request.ts`

- login(data) - 登录配置 post ./login
- getImageCaptcha(params) - 获取验证码 get ./captcha/img

**`@/utils/request.ts`**

- type BaseResponse - Promise
- type Response - code, message, data 请求结果类型
- interface RequestOptions - request 选项

---------------------------------------------------------------------------------------
##

`@/router/constant` - 路由列表
`@/enums/cacheEnum` - 常量