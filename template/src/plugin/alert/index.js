import myMsg from 'vux/src/components/alert'

let $vm
let nShow
let nHide
// 是否优先使用原生的,默认值：false
let nativeFirst = false

const plugin = {
  install(vue, options) {
    const Msg = vue.extend(myMsg)

    if (!nShow) {
      nShow = options.alert
    }
    if (!nHide) {
      nHide = options.alertClose
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
      if (nativeFirst) {
        // 优先使用原生
        nShow(msg, opts)
      } else {
        options.addMsgBack({
          name: 'alert',
          index: 50,
          handle: function () {
            // options.log('alert back')
            if ($vm.showValue === true) {
              hide()
              return false
            }
            return true
          }
        })
        if (typeof opts === 'object') {
          // 弹窗标题
          if (opts.title && !msg) {
            msg = ''
            // opts.title = ''
          }
          // 按钮文字
          opts.buttonText = opts.buttonText || '确定'
          // 遮罩动画
          opts.maskTransition = opts.maskTransition || 'vux-fade'
          // 弹窗主体动画
          opts.dialogTransition = opts.dialogTransition || 'vux-dialog'

          opts.onShow = opts.onShow || (() => {})
          opts.onHide = opts.onHide || (() => {})
          opts._onHide = hide

          for (let i in opts) {
            $vm[i] = opts[i]
          }
        }
        // 内容，支持 html，和默认slot同样功能
        $vm.$el.querySelector('.weui-dialog__bd').innerHTML = msg
        opts.onShow && opts.onShow($vm)
        $vm.showValue = true
      }
    }
    const hide = () => {
      if (nativeFirst) {
        // 优先使用原生
        nHide()
      } else {
        options.removeMsgBack('alert', 50)
        $vm.showValue === true && ($vm.showValue = false)
        $vm.onHide && $vm.onHide($vm)
      }
    }

    options.alert && delete options.alert
    options.alert = show
    options.alertClose && delete options.alertClose
    options.alertClose = hide
  }
}

export default plugin
