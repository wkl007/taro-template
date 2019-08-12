import { combineReducers } from 'redux'
import loginStatus from '@/redux/reducers/loginStatus'
import accessToken from '@/redux/reducers/accessToken'
import userInfo from '@/redux/reducers/userInfo'
import isIpx from '@/redux/reducers/isIpx'

// 合并reducer
export default combineReducers({
  loginStatus,
  accessToken,
  userInfo,
  isIpx,
})
