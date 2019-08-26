import Types from '@/redux/constants'
import { loadData, LOGIN_STATUS } from '@/utils/cache'

const defaultState: boolean = loadData(LOGIN_STATUS) || false

/**
 *
 * @param state
 * @param action
 */
export default function onAction (state = defaultState, action: { type: string; data: any; }) {
  const { type, data } = action
  switch (type) {
    case Types.SET_LOGIN_STATUS:
      return data
    default:
      return state
  }
}
