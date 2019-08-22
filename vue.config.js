
const webpack = require('webpack')
// 获取编译环境
const buildEnv = process.env.ENV || 'prod'
// 传递环境变量 // 编译模式
const buildDefine = Object.assign({ NODE_ENV: buildEnv === 'prod' ? '"production"' : '"development"' })
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/www/'
    : './', // 部署应用包时的基本 URL
  // 所有 webpack-dev-server 的选项都支持
  devServer: {
    open: true, // 自动打开浏览器
    host: 'localhost',
    port: '8080',
    hot: true,
    https: false, // 启用https
    proxy: 'http://localhost:3000'
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  outputDir: 'dist', // 打包之后的文件名称
  assetsDir: 'static', // 放置生成的静态资源（js,css,img,fonts）
  runtimeCompiler: true, // 是否使用包含运行时编译器的Vue核心的构建
  indexPath: 'index.html', // 指定生成index.html的路径
  filenameHashing: 'true', // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  // pages: {}, // 多页面配置
  lintOnSave: true, // eslint-loader 是否在保存的时候检查
  // 默认情况下 babel-loader 忽略其中的所有文件 node_modules，
  // 想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
  transpileDependencies: [],
  integrity: false, // 构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性, 默认false
  // 扩展webpack配置（两种写法一种直接加入插件。一种configureWebpack:config => {if(环境){}else{}}）
  configureWebpack: {
    // plugin: []
  },
  // 修改webpack配置
  chainWebpack: config => {
    config
      .plugin('define')
      .init((Plugin, args) => new webpack.DefinePlugin(
        { 'process.env': buildDefine }
      ))
    // config.module
    //   .rule('svg')
    //   .test(/\.svg$/)
    //   .include
    //   .add(path.join(__dirname, 'src/assets/icons'))
    //   .end()
    //   .use('svg-sprite')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: 'icon-[name]'
    //   })
  },
  css: {
    // false 时只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块
    // true 时可以去掉文件名中的 .module， 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块
    modules: false,
    // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
    // 生产环境下是 true，开发环境下是 false
    extract: true,
    sourceMap: false, // 是否构建样式地图，设置为 true 之后可能会影响构建的性能
    // css预设器配置项
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },

      postcss: {
        // 这里的选项会传递给 postcss-loader
      }
    }
  },
  // 构建时开启多进程处理 babel 编译
  // 是否为 Babel 或 TypeScript 使用 thread-loader。
  parallel: require('os').cpus().length > 1
}
