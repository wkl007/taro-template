import request from '@/utils/request'

export function getBannerList (): Promise<any> {
  return request({
    url: `/cms_content/content/`,
    method: 'GET'
  })
}

export function login (data: any): Promise<any> {
  return request({
    url: `/auth/applets`,
    method: 'POST',
    data
  })
}
