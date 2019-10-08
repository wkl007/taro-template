import { combineReducers } from 'redux'
import loginStatus from '@/redux/reducers/loginStatus'
import accessToken from '@/redux/reducers/accessToken'
import userInfo from '@/redux/reducers/userInfo'

// 合并reducer
export default combineReducers({
  loginStatus,
  accessToken,
  userInfo,
})
