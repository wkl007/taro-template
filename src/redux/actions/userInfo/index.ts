import Types from '@/redux/constants'
import { saveData, USER_INFO } from '@/utils/cache'

export function setUserInfo (data: any): object {
  return dispatch => {
    saveData(USER_INFO, data)
    dispatch({
      type: Types.SET_USER_INFO,
      data
    })
  }
}
