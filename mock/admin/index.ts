import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/mock-api/admin/login',
    methods: 'post',
    timeout: 2000,
    response: {
      code: 404,
      data: null,
      message: "Cannot GET /admin/login"
    }
  },
  {
    url: '/mock-api/admin/captcha/img',
    methods: 'get',
    timeout: 2000,
    response: {
      code: 200,
      data: {img: 'img', id: 'id'},
      message: "success"
    }
  }  
] as MockMethod[];