interface TypesInterface {
  [key: string]: string;
}

const Types: TypesInterface = {
  SET_LOGIN_STATUS: 'SET_LOGIN_STATUS',// 登录状态
  SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN',// 用户token
  SET_USER_INFO: 'SET_USER_INFO',// 用户信息
}

export default Types
