const { withEsbuildOverride } = require('remix-esbuild-override')
const { NodeGlobalsPolyfillPlugin } = require('@esbuild-plugins/node-globals-polyfill')

// remix-esbuild-override is annoying as fuck
const log = console.log
console.log = () => {}

// Add node `Buffer` polyfill for mantine
withEsbuildOverride((option, { isServer }) => {
  if (option.plugins === undefined) {
    option.plugins = []
  }

  option.plugins.push(
    NodeGlobalsPolyfillPlugin({
      buffer: true
    })
  )

  return option
})
console.log = log

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: 'cloudflare-workers',
  ignoredRouteFiles: ['**/.*']
}
