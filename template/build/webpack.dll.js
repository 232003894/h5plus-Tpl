var path = require("path")
webpack = require("webpack")

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

var vendors = [
  'es6-promise',
  'vue',
  'h5p.js',
  'fastclick',
  'vee-validate',
  'axios',
  'vux-xscroll'
]
module.exports = {
  entry: {
    vendor: vendors
  },
  output: {
    path: resolve("static"),
    filename: "base.js",
    library: "[name]_[hash]"
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '..', "src", "manifest.json"),
      name: "[name]_[hash]",
      context: __dirname
    }), new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      // https://github.com/mishoo/UglifyJS2/blob/master/lib/output.js
      output: {
        //中文ascii化，非常有用！防止中文乱码的神配置
        ascii_only: true,
        //在输出中保存版权注释
        comments: false
      },
      // https://github.com/mishoo/UglifyJS2/blob/master/lib/compress.js
      compress: {
        // 不输出警告
        warnings: false,
        // 去掉 console
        drop_console: false,
        // 去掉 debugger
        drop_debugger: true
      },
      sourceMap: true
    })
  ]
};
