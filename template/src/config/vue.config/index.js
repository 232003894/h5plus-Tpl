// 验证插件
import vvConfig from './vee-validate'

import ToastPlugin from '../../plugin/toast'
import AlertPlugin from '../../plugin/alert'
import ConfirmPlugin from '../../plugin/confirm'
import LoadingPlugin from '../../plugin/loading'
import LoginPlugin from '../../plugin/login'
import PowerPlugin from '../../plugin/power'

export default function (vue, _api) {
  // 由于ESLint会检测没有定义的变量，因此需要这一个`global`注释声明IS_PRODUCTION是一个全局变量(当然在本例中并不是)来规避warning
  /* global IS_PRODUCTION:true */
  if (IS_PRODUCTION) {
    // 生产环境之用
    vue.config.devtools = false
  } else {
    // 开发环境之用
    vue.config.devtools = true
  }

  // 过滤器
  vue.filter('formatDate', _api.formatDate)
  vue.filter('capitalize', _api.capitalize)
  vue.filter('uppercase', _api.uppercase)
  vue.filter('lowercase', _api.lowercase)
  vue.filter('pluralize', _api.pluralize)
  vue.filter('currency', _api.currency)
  vue.filter('number', _api.number)

  // 验证
  vvConfig(vue, window.$api)

  // msg插件
  vue.use(ToastPlugin, _api)
  vue.use(AlertPlugin, _api)
  vue.use(ConfirmPlugin, _api)
  vue.use(LoadingPlugin, _api)
  vue.use(LoginPlugin, _api)
  vue.use(PowerPlugin, _api)

  vue.prototype.$api = _api

  // vue.filter('debounce', api.debounce)
}
