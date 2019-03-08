import Types from '../../constants'
import { loadData, USER_INFO } from '../../../utils/catche'

const defaultState = loadData(USER_INFO)
/**
 * state树
 * userInfo:{}
 */

/**
 *
 * @param state
 * @param action
 */
export default function onAction (state = defaultState, action) {
  const { type, data } = action
  switch (type) {
    case Types.SET_USER_INFO:
      return {
        ...state,
        ...data
      }
    default:
      return state
  }
}
