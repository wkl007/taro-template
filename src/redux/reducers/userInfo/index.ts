import Types from '@/redux/constants'
import { loadData, USER_INFO } from '@/utils/cache'

const defaultState: any = loadData(USER_INFO)

/**
 *
 * @param state
 * @param action
 */
export default function onAction (state = defaultState, action: { type: string; data: any; }) {
  const { type, data } = action
  switch (type) {
    case Types.SET_USER_INFO:
      if (data) {
        return {
          ...state,
          ...data
        }
      } else {
        return data
      }
    default:
      return state
  }
}
