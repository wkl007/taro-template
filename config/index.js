const path = require('path')

const resolve = dir => path.resolve(__dirname, '..', dir)

const config = {
  // 项目名称
  projectName: 'taro-template',
  // 项目创建日期
  date: '2019-12-31',
  // 设计稿尺寸
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  // 项目源码目录
  sourceRoot: 'src',
  // 项目产出目录
  outputRoot: 'dist',
  // babel 配置
  babel: {
    sourceMap: true,
    presets: [
      ['env', {
        modules: false
      }]
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread',
      ['transform-runtime', {
        helpers: false,
        polyfill: false,
        regenerator: true,
        moduleName: 'babel-runtime'
      }
      ]
    ]
  },
  // 压缩js
  uglify: {
    enable: true,
    config: {
      warnings: false,
      // 配置项同 https://github.com/mishoo/UglifyJS2#minify-options
      compress: {
        drop_debugger: true,
        drop_console: true,
      },
    }
  },
  // 压缩css
  csso: {
    enable: true,
    config: {
      // 配置项同 https://github.com/css/csso#minifysource-options
    }
  },
  // 全局变量设置
  defineConstants: {},
  // 目录别名设置
  alias: {
    '@': resolve('src'),
  },
  copy: {
    patterns: [
      { from: 'src/components/ParserRichText/Parser/', to: 'dist/components/ParserRichText/Parser/' }
    ],
    options: {}
  },
  // 小程序端专用配置
  mini: {
    compile: {
      compressTemplate: true,// 打包时是否需要压缩 wxml
    },
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          overrideBrowserslist: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      },
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 10240 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          overrideBrowserslist: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
