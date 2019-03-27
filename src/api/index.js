import request from '../utils/request'

export function getBannerList () {
  let url = `/cms_content/content/`
  return request({
    url,
    method: 'get'
  })
}

export function login (data) {
  let url = `/auth/applets`
  return request({
    url,
    method: 'post',
    data
  })
}
