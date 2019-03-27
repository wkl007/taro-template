import Types from '../../constants'
import { saveData, IS_IPHONEX } from '../../../utils/cache'

export function setIsIpx (data) {
  return dispatch => {
    saveData(IS_IPHONEX, data)
    dispatch({
      type: Types.SET_IS_IPX,
      data
    })
  }
}
