import request from '@/utils/request'

export function getAllBookInfo() {
  return request({
    url: '/book',
    method: 'get'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

