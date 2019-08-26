import Types from '@/redux/constants'
import { loadData, IS_IPHONEX } from '@/utils/cache'

const defaultState: boolean = loadData(IS_IPHONEX) || false

/**
 *
 * @param state
 * @param action
 */
export default function onAction (state = defaultState, action: { type: string; data: any; }) {
  const { type, data } = action
  switch (type) {
    case Types.SET_IS_IPX:
      return data
    default:
      return state
  }
}
