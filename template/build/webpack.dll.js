var path = require("path")
var fs = require('fs')
var webpack = require("webpack")

var basename = 'template.html'
var pageArr = require('./base/page-entries')(basename)
var _parm = new Date().valueOf()
pageArr.forEach((page) => {
  var _page = path.join(__dirname, '..', 'src', 'pages', page)
  fs.readFile(_page, 'utf8', (err, data) => {
    if (!err) {
      var dataStr = data.toString()
      dataStr = dataStr.replace(/<script.*src="..\/static\/base\.js.*"><\/script>/, '<script type="text/javascript" src="../static/base.js?' + _parm + '"></script>');
      fs.writeFile(_page, dataStr)
    } else {
      console.log(err);
    }
  })
})

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
    path: path.join(__dirname, '..', "static"),
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
