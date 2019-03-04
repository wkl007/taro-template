const target = process.env.npm_lifecycle_event
const testTarget = 'test'
const buildTarget = 'build'

let env

if (target.indexOf(testTarget) >= 0) {
  env = {
    NODE_ENV: '"production"',
    BASE_URL: '"https://api.test.com/v1/applets"',
  }
} else if (target.indexOf(buildTarget) >= 0) {
  env = {
    NODE_ENV: '"production"',
    BASE_URL: '"https://api.build.com/v1/applets"',
  }
}

module.exports = {
  env,
  defineConstants: {},
  weapp: {},
  h5: {}
}
