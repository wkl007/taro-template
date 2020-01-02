const target = process.env.npm_lifecycle_event
const TEST = 'test'
const BUILD = 'build'

let defineConstants

if (target.indexOf(TEST) >= 0) {
  defineConstants = {
    BASE_URL: '"https://api.test.com/v1/applets"',
  }
} else if (target.indexOf(BUILD) >= 0) {
  defineConstants = {
    BASE_URL: '"https://api.build.com/v1/applets"',
  }
}

module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants,
  mini: {},
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  }
}
