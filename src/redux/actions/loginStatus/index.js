import Types from '../../constants'
import { saveData, LOGIN_STATUS } from '../../../utils/cache'

export function setLoginStatus (data) {
  return dispatch => {
    saveData(LOGIN_STATUS, data)
    dispatch({
      type: Types.SET_LOGIN_STATUS,
      data
    })
  }
}
