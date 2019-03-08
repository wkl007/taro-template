import request from '../utils/request'

export function login (data) {
  let url = `/auth/applets`
  return request({
    url,
    method: 'post',
    data
  })
}
