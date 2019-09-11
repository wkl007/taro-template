import Taro from '@tarojs/taro'

function withShare (opts: { title?: string; imageUrl?: string, path?: string } = {}) {

  // 设置默认
  const defalutPath = '/pages/index/index'
  const defalutTitle = '首页'
  const defaultImageUrl = 'http://thumb10.jfcdns.com/2018-06/bce5b10ae530f530.png'

  return function demoComponent (Component) {

    class WithShare extends Component {
      componentDidMount () {
        if (super.componentDidMount) {
          super.componentDidMount()
        }
      }

      // 点击分享的那一刻会进行调用
      onShareAppMessage () {
        let { title, imageUrl, path = null } = opts
        // 从继承的组件获取配置
        if (this.$setSharePath && typeof this.$setSharePath === 'function') {
          path = this.$setSharePath()
        }
        // 从继承的组件获取配置
        if (this.$setShareTitle && typeof this.$setShareTitle === 'function') {
          title = this.$setShareTitle()
        }
        // 从继承的组件获取配置
        if (this.$setShareImageUrl && typeof this.$setShareImageUrl === 'function') {
          imageUrl = this.$setShareImageUrl()
        }
        if (!path) {
          path = defalutPath
        }

        console.log(path)
        return {
          title: title || defalutTitle,
          path: path || defalutPath,
          imageUrl: imageUrl || defaultImageUrl
        }
      }

      render () {
        return super.render()
      }
    }

    return WithShare
  } as any
}

export default withShare
