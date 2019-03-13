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
  weapp: {},
  h5: {}
}
