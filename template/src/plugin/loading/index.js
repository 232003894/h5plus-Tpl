import myMsg from 'vux/src/components/loading'

let $vm
// let watcher
let nShow
let nHide
// 是否优先使用原生的,默认值false
let nativeFirst = false

const plugin = {
  install(vue, options) {
    const Msg = vue.extend(myMsg)

    if (!nShow) {
      nShow = options.loading
    }
    if (!nHide) {
      nHide = options.loadingClose
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
      options.addMsgBack({
        name: 'loading',
        index: 50,
        handle: function () {
          // options.log('loading back')
          if ($vm.show === true || nativeFirst === true) {
            // $vm.show = false
            hide()
            return false
          }
          return true
        }
      })
      if (nativeFirst && options.os.plus) {
        // 优先使用原生并且是plus环境
        nShow(msg, opts)
      } else {
        // destroy watcher
        // watcher && watcher()
        // 提示内容，支持 html，和默认slot同样功能
        opts.text = msg || '载入中'
        if (typeof opts === 'object') {
          // 定位方式，在100%的布局下用absolute可以避免抖动
          opts.position = opts.position || 'absolute'
          opts.onShow = opts.onShow || (() => {})
          opts.onHide = opts.onHide || (() => {})
          for (let i in opts) {
            $vm[i] = opts[i]
          }
          // watcher = $vm.$watch('show', (val) => {
          //   // val && opts.onShow && opts.onShow($vm)
          //   // val === false && opts.onHide && opts.onHide($vm)
          //   if (val) {
          //     opts.onShow($vm)
          //   } else if (val === false) {
          //     // hide()
          //   }
          // })
        }
        opts.onShow && opts.onShow()
        $vm.show = true
      }
    }
    const hide = () => {
      options.removeMsgBack('loading', 50)
      if (nativeFirst && options.os.plus) {
        // 优先使用原生并且是plus环境
        nHide()
      } else {
        $vm.show === true && ($vm.show = false)
        $vm.onHide & $vm.onHide()
      }
    }

    options.loading && delete options.loading
    options.loading = show
    options.loadingClose && delete options.loadingClose
    options.loadingClose = hide
  }
}

export default plugin
