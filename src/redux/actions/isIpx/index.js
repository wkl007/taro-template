import Types from '@/redux/constants'
import { IS_IPHONEX, saveData } from '@/utils/cache'

export function setIsIpx (data) {
  return dispatch => {
    saveData(IS_IPHONEX, data)
    dispatch({
      type: Types.SET_IS_IPX,
      data
    })
  }
}
