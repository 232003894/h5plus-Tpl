// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.config with an alias.
// [vux-loader的js-parser] 将被替换为:导入`Vue`以及Config
const Vue = () => {}
import App from './App'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {
    App
  }
})
