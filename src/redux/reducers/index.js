import { combineReducers } from 'redux'
import counter from './counter'
import loginStatus from './loginStatus'
import accessToken from './accessToken'
import userInfo from './userInfo'
import isIpx from './isIpx'

//合并reducer
export default combineReducers({
  counter,
  loginStatus,
  accessToken,
  userInfo,
  isIpx,
})
