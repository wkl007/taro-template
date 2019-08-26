import Types from '@/redux/constants'
import { loadData, ACCESS_TOKEN } from '@/utils/cache'

const defaultState: string = loadData(ACCESS_TOKEN) || ''

/**
 *
 * @param state
 * @param action
 */
export default function onAction (state = defaultState, action: { type: string; data: any; }) {
  const { type, data } = action
  switch (type) {
    case Types.SET_ACCESS_TOKEN:
      return data
    default:
      return state
  }
}
