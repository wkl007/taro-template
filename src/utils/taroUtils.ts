import Taro from '@tarojs/taro'
import configStore from '@/redux/store'
import actions from '@/redux/actions'
import { login } from '@/api'
import { loadData, LOGIN_STATUS } from '@/utils/cache'

const store = configStore()

/**
 * 登录
 */
export function taroLogin (): Promise<any> {
  const loginStatus = loadData(LOGIN_STATUS)
  return new Promise((resolve, reject) => {
    if (loginStatus) {
      const res = { status: 1, data: '已登录' }
      resolve(res)
    } else {
      Taro.login({
        success: res => {
          Taro.getUserInfo({
            lang: 'zh_CN',
            success: ({ rawData, signature, encryptedData, iv, userInfo }) => {
              Taro.showLoading({ title: '登录中' })
              const data = {
                code: res.code,
                rawData,
                signature,
                encryptedData,
                iv,
                userInfo
              }
              login(data).then(res => {
                const { accessToken, userInfo } = res
                store.dispatch(actions.setLoginStatus(true))
                store.dispatch(actions.setAccessToken(accessToken))
                store.dispatch(actions.setUserInfo(userInfo))
                Taro.hideLoading()
                Taro.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 1000
                })
                setTimeout(() => {
                  resolve(res)
                }, 1000)
              }).catch(err => {
                reject(err)
              })
            }
          })
        }
      })
    }
  })
}

/**
 * 支付
 * @param data
 */
export function taroPay (data: { timeStamp: string; nonceStr: string; signType?: keyof Taro.requestPayment.signType; paySign: string; package: string }): Promise<any> {
  const { timeStamp, nonceStr, signType, paySign } = data
  return new Promise((resolve, reject) => {
    Taro.requestPayment({
      timeStamp,
      nonceStr,
      package: data.package,
      signType,
      paySign,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

/**
 * 下载临时图片
 * @param filePath
 */
export function taroDownload (filePath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    Taro.saveImageToPhotosAlbum({
      filePath,
      // @ts-ignore
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

/**
 * 下载图片到本地
 * @param url
 */
export function taroDownloadImage (url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    Taro.downloadFile({
      url,
      success: res => {
        if (res.statusCode === 200) {
          const tempFilePaths = res.tempFilePath
          Taro.saveImageToPhotosAlbum({
            filePath: tempFilePaths,
            // @ts-ignore
            success: res => resolve(res),
            fail: err => reject(err)
          })
        }
      }
    })
  })
}

/**
 * 图片上传
 * @param data
 */
export function taroUploadFile (data: { url: string; filePath: string; fileName: string; }): Promise<any> {
  const { url, filePath, fileName } = data
  return new Promise((resolve, reject) => {
    Taro.uploadFile({
      url,
      filePath,
      name: fileName,
      fileName: fileName,
      header: {
        'Content-Type': 'multipart/form-data',
      },
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

/**
 * 领卡
 * @param data
 */
export function taroAddCard (data: { card_id: string; api_ticket: string; timestamp: string; noncestr: string; sign: string; }): Promise<any> {
  const { card_id, api_ticket, timestamp, noncestr, sign } = data
  const cardExtData = {
    api_ticket,
    timestamp,
    nonce_str: noncestr,
    signature: sign,
  }
  return new Promise((resolve, reject) => {
    Taro.addCard({
      cardList: [
        {
          cardId: card_id,
          cardExt: JSON.stringify(cardExtData),
        },
      ],
      // @ts-ignore
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

/**
 * 判断设备
 */
export function taroGetSystemInfo (): Promise<any> {
  return new Promise((resolve, reject) => {
    Taro.getSystemInfo({
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

/**
 * 强制更新
 */
export function taroUpdate () {
  const updateManager = Taro.getUpdateManager()
  updateManager.onCheckForUpdate(res => {
    if (!res.hasUpdate) return
    updateManager.onUpdateReady(() => {
      Taro.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: res => {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(() => {
      // 新的版本下载失败
      Taro.showModal({
        title: '已经有新版本了哟~',
        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
      })
    })
  })
}
