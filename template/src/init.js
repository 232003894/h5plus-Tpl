import Vue from 'vue'
Vue.config.productionTip = false
import config from '@/config'
config(Vue)
// 添加Fastclick移除移动端点击延迟
const FastClick = require('fastclick')
FastClick.attach(document.body)
export default Vue
