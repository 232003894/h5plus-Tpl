import myMsg from 'vux/src/components/toast'

let $vm
let watcher
let nShow
let nHide
// 是否优先使用原生的,默认值false
let nativeFirst = false

const plugin = {
  install(vue, options) {
    const Msg = vue.extend(myMsg)

    if (!nShow) {
      nShow = options.toast
    }
    if (!nHide) {
      nHide = options.toastClose
    }

    if (!$vm) {
      $vm = new Msg({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }

    const show = (msg, opts) => {
      opts = opts || {}
      if (opts.nativeFirst === true) {
        nativeFirst = true
      } else {
        nativeFirst = false
      }
      if (nativeFirst && options.os.plus) {
        // 优先使用原生并且是plus环境
        nShow(msg, opts)
      } else {
        options.addMsgBack({
          name: 'toast',
          index: 50,
          handle: function () {
            // options.log('toast back')
            if ($vm.show) {
              hide()
              return false
            }
            return true
          }
        })
        // destroy watcher
        watcher && watcher()
        // 提示内容，支持 html，和默认slot同样功能
        opts.text = msg || ''
        if (typeof opts === 'object') {
          // 类型，可选值 success, warn, cancel, text
          opts.type = opts.type || 'text'
          // 显示位置，默认值：'middle'，可选值 default, top, middle, bottom
          opts.position = opts.position || 'middle'
          // 显示时间
          opts.time = opts.time || 2000
          // 是否显示遮罩，如果显示，用户将不能点击页面上其他元素
          if (opts.isShowMask === undefined) {
            opts.isShowMask = true
          }
          opts.onShow = opts.onShow || (() => {})
          opts.onHide = opts.onHide || (() => {})
          if (!opts.width) {
            opts.width = 'auto'
          }
          for (let i in opts) {
            $vm[i] = opts[i]
          }
          watcher = $vm.$watch('show', (val) => {
            // val && options.onShow && options.onShow($vm)
            // val === false && options.onHide && options.onHide($vm)
            if (val) {
              opts.onShow($vm)
            } else if (val === false) {
              options.removeMsgBack('toast', 50)
              opts.onHide($vm)
            }
          })
        }
        $vm.show = true
      }
    }
    const hide = () => {
      if (nativeFirst && options.os.plus) {
        // 优先使用原生并且是plus环境
        nHide()
      } else {
        $vm.show === true && ($vm.show = false)
      }
    }

    options.toast && delete options.toast
    options.toast = show
    options.toastClose && delete options.toastClose
    options.toastClose = hide
  }
}

export default plugin
