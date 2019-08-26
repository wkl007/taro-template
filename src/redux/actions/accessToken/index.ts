import Types from '@/redux/constants'
import { saveData, ACCESS_TOKEN } from '@/utils/cache'

export function setAccessToken (data: string): object {
  return dispatch => {
    saveData(ACCESS_TOKEN, data)
    dispatch({
      type: Types.SET_ACCESS_TOKEN,
      data
    })
  }
}
