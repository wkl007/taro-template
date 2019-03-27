import Types from '../../constants'
import { loadData, IS_IPHONEX } from '../../../utils/cache'

const defaultState = loadData(IS_IPHONEX) || false
/**
 * state树
 * isIpx:true Boolean
 */

/**
 *
 * @param state
 * @param action
 */
export default function onAction (state = defaultState, action) {
  const { type, data } = action
  switch (type) {
    case Types.SET_IS_IPX:
      return data
    default:
      return state
  }
}
