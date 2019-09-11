'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
console.log(process.env.NODE_ENV, '<======环境变量')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ?
    '/' : '/', //  部署应用包时的基本 URL
  outputDir: 'dist', // 运行 vue-cli-service build 时生成的生产环境构建文件的目录
  assetsDir: '', //  放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  lintOnSave: process.env.NODE_ENV !== 'production', //  是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码

  devServer: {
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    // proxy: {
    //   '/api': {
    //     target: 'http://192.168.1.98:3002/',
    //     ws: false,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ['^' + process.env.VUE_APP_BASE_API]: '/'
    //     }
    //   },
    // }
  },

  // eslint-disable-next-line no-unused-vars
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },

  chainWebpack(config) {
    // 删除之前所有svg规则
    // config.module.rules.delete("svg");
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
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 16, // 换算的基数
            selectorBlackList: ['*', '!border'], // 忽略转换正则匹配项
            propList: ['*'],
          }),
        ]
      }
    }
  }
}