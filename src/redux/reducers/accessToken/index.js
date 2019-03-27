import Types from '../../constants'
import { loadData, ACCESS_TOKEN } from '../../../utils/cache'

const defaultState = loadData(ACCESS_TOKEN) || false
/**
 * state树
 * accessToken:''
 */

/**
 *
 * @param state
 * @param action
 */
export default function onAction (state = defaultState, action) {
  const { type, data } = action
  switch (type) {
    case Types.SET_ACCESS_TOKEN:
      return data
    default:
      return state
  }
}
