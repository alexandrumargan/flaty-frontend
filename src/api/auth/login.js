import request from '@/providers/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }

  return request({
    url: 'api/auth/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: 'api/auth/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: 'auth/user/info',
    method: 'get',
    params: { token }
  })
}
