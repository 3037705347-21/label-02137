import request from './request'

export const userApi = {
  // 登录
  login(data) {
    return request.post('/user/login', data)
  },

  // 登出
  logout() {
    return request.post('/user/logout')
  }
}
