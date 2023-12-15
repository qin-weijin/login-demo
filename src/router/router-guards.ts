import { LOGIN_NAME, REDIRECT_NAME } from './constant';
import { ACCESS_TOKEN_KEY } from '@/enums/cacheEnum';
/**
 * 定义导航守卫 - beforeEach
 * 
*/
export function createRouterGuards(router: Router, whiteNameList: WhiteNameList) {
  router.beforeEach(async (to, _, next) => {
    next()
  });
  router.afterEach((to, from, failure) => {});
  router.onError((error) => { console.log(error, '路由错误'); });
}