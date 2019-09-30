const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'v-Blog Admin' // page title

const port = process.env.port || process.env.npm_config_port || 8081 // dev port

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    // proxy: {
    //     // change xxx-api/login => mock/login
    //     // detail: https://cli.vuejs.org/config/#devserver-proxy
    //     // [process.env.VUE_APP_BASE_API]: {
    //     //     target: `http://127.0.0.1:8080/blog`,
    //     //     changeOrigin: true,
    //     //     pathRewrite: {
    //     //         ['^' + process.env.VUE_APP_BASE_API]: ''
    //     //     }
    //     // }
    //     '/api': {
    //         target: 'http://127.0.0.1:8080/blog',
    //         ws: true,
    //         changeOrigin: true
    //     }
    // },
  },

  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
  }
}
