import request from '../utils/request'

export function getBannerList () {
  let url = `/cms_content/content/`
  return request({
    url,
    method: 'get'
  })
}
