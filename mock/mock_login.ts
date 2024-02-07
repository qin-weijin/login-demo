export default [
  {
    url: '/mock-api/login',
    method: 'post',
    response: ({ body }) => {
      const admin = {username: 'admin', password: '123456' }
      if (body.password === admin.password && body.username === admin.username) {
        return {
          code: 200,
          data: { token: '@guid' },
          message: 'success'
        }
      } else {
        return {
          code: 403,
          message: 'The username or password is incorrect'
        }
      }
    }
  }
]