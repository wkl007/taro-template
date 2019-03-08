import Types from '../../constants'
import { loadData, LOGIN_STATUS } from '../../../utils/catche'

const defaultState = loadData(LOGIN_STATUS)
/**
 * state树
 * loginStatus:true Boolean
 */

/**
 *
 * @param state
 * @param action
 */
export default function onAction (state = defaultState, action) {
  const { type, data } = action
  switch (type) {
    case Types.SET_LOGIN_STATUS:
      return data
    default:
      return state
  }
}
