import myMsg from 'vux/src/components/confirm'

let $vm
// let hasWatch = false
let nShow
let nHide
// 是否优先使用原生的,默认值false
let nativeFirst = false

const plugin = {
  install(vue, options) {
    const Msg = vue.extend(myMsg)

    if (!nShow) {
      nShow = options.confirm
    }
    if (!nHide) {
      nHide = options.confirmClose
    }

    if (!$vm) {
      $vm = new Msg({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }

    const closeHandler = function () {
      // $vm.showValue === true && ($vm.showValue = false)
      hide()
    }

    const show = (msg, opts) => {
      opts = opts || {}
      if (opts.nativeFirst === true) {
        nativeFirst = true
      } else {
        nativeFirst = false
      }
      if (nativeFirst) {
        // 优先使用原生
        nShow(msg, opts)
      } else {
        options.addMsgBack({
          name: 'confirm',
          index: 50,
          handle: function () {
            // options.log('confirm back')
            if ($vm.showValue === true) {
              // $vm.showValue = false
              hide()
              return false
            }
            return true
          }
        })
        if (typeof opts === 'object') {
          // 弹窗标题
          if (opts.title && !msg) {
            msg = opts.title
            opts.title = ''
          }
          // 内容，支持 html，和默认slot同样功能
          opts.content = msg
          // 确认按钮文字
          opts.confirmText = opts.confirmText || '确认'
          // 取消按钮文字
          opts.cancelText = opts.cancelText || '取消'
          // 遮罩动画
          opts.maskTransition = opts.maskTransition || 'vux-fade'
          // 弹窗主体动画
          opts.dialogTransition = opts.dialogTransition || 'vux-dialog'
          opts.onShow = opts.onShow || (() => {})
          opts.onHide = opts.onHide || (() => {})
          opts.onCancel = opts.onCancel || (() => {})
          opts.onConfirm = opts.onConfirm || (() => {})
          for (let i in opts) {
            $vm[i] = opts[i]
          }
        }
        opts.onShow && opts.onShow()
        $vm.$el.querySelector('.weui-dialog__ft').addEventListener('click', closeHandler, false)
        // if (!hasWatch) {
        //   // $vm.$watch('showValue', (val) => {
        //   //   if (!val) {
        //   //     hide()
        //   //   }
        //   // })
        //   // $vm.$on('on-cancel', () => {
        //   //   console.log('object发生大幅度是')
        //   //   opts && opts.onCancel && opts.onCancel()
        //   //   // $vm.showValue = false
        //   //   hide()
        //   // })
        //   // $vm.$on('on-confirm', () => {
        //   //   opts && opts.onConfirm && opts.onConfirm()
        //   //   // $vm.showValue = false
        //   //   hide()
        //   // })
        //   hasWatch = true
        //   $vm.$el.querySelector('.weui_dialog_ft').addEventListener('click', closeHandler, false)
        // }
        $vm.showValue = true
      }
    }
    const hide = () => {
      if (nativeFirst) {
        // 优先使用原生
        nHide()
      } else {
        options.removeMsgBack('confirm', 50)
        // $vm.showValue = false
        $vm.showValue === true && ($vm.showValue = false)
        $vm.onHide & $vm.onHide()
      }
    }
    if (options.os.plus) {

    } else {
      // 注册后退键的提示
      options.onload(() => {
        options.addBack({
          name: 'basic',
          index: 100,
          handle: function () {
            if ((options.canHistoryBack() || !options.isHomePage()) && window.history.length > 1) {
              window.history.back()
              return false
            } else {
              var _str = '本页面'
              if (options.isHomePage()) {
                _str = '本应用'
                show('是否退出' + _str + '？', {
                  title: '退出',
                  confirmText: '退出' + _str,
                  cancelText: '不了',
                  onConfirm: () => {
                    window.location.href = 'about:blank'
                  }
                })
              }
            }
            return true
          }
        })
      })
    }

    options.confirm && delete options.confirm
    options.confirm = show
    options.confirmClose && delete options.confirmClose
    options.confirmClose = hide
  }
}

export default plugin
