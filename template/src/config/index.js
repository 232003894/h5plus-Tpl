require('es6-promise').polyfill()
import '@/assets/css.vue'
import {
  pages
}
from './pages.js'
// import * as _api from '../libs/api'
import * as _api from 'h5p.js'
if (!window.$api) {
  window.$api = _api
  $api.addPage(pages)
}
import common from './common'
if (!window.common) {
  window.common = common
}
import vueConfig from './vue.config'
import httpConfig from './http.config'

export default function (Vue) {
  vueConfig(Vue, window.$api)
  httpConfig(Vue, window.$api)
  // 注册安卓按键
  $api.mounted(() => {
    $api.androidKeys()
  })
}
