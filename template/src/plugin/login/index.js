import myMsg from './login.vue'

let $vm

const plugin = {
  install(vue, options) {
    const Msg = vue.extend(myMsg)

    if (!$vm) {
      $vm = new Msg({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }

    /**
     * 登录
     * @param {any} necessary
     * @param {any} callback
     */
    const show = (necessary, callback) => {
      /**
       * 回调：
       * 有些操作或请求会验证是否登录，未登录时会自动调用登录
       * 当登录成功后可以执行重试来源操作或其他的附加操作
       */
      // callback = callback || (() => {})
      // 是否
      // necessary === undefined
      if (typeof necessary === 'boolean') {
        callback = callback || (() => {})
      } else if (options.isFunction(necessary)) {
        callback = necessary
        necessary = true
      } else {
        callback = () => {}
        necessary = true
      }
      $vm.callback = callback
      $vm.necessary = necessary

      options.addMsgBack({
        name: 'login',
        index: 50,
        handle: function () {
          // options.log('login cancle')
          if ($vm.show === true) {
            cancle()
            return false
          }
          return true
        }
      })
      $vm.show = true
    }

    /**
     * 完成登录(登录成功)
     */
    const close = () => {
      if ($vm.show === true) {
        // 执行登录成功回调
        $vm.callback && $vm.callback()
        // if ($vm.necessary) {
        //   // 来源页面 登陆后 需要刷新
        // }
        // 全局事件通知：已经登录
        // options.fireAll('logined')
        // 登录完成后关闭
        hide()
      }
    }
    /**
     * 取消登录(未登录)
     */
    const cancle = () => {
      if ($vm.show === true) {
        // 取消登录,不执行回调
        if ($vm.necessary) {
          // 来源页面 登陆后 需要刷新
          if (options.os.plus) {
            if (options.plusBack()) {
              // 关闭登录层
              hide()
            }
          } else {
            if (options.canHistoryBack() && window.history.length > 1) {
              window.history.back()
              // 关闭登录层
              hide()
            } else {
              // 直接后退
              $api.back()
            }
          }
        } else {
          // 来源页面 登陆后 不需要 刷新：直接关闭登录层
          hide()
        }
      }
    }

    /**
     * 关闭登录层
     */
    const hide = () => {
      // 去掉login back action
      options.removeMsgBack('login', 50)
      if ($vm.show === true) {
        // 关闭登录层
        $vm.show = false
        // 重置属性
        $vm.necessary = false
        $vm.callback = () => {}
      }
    }

    options.login && delete options.login
    options.login = show
    options.loginCancle && delete options.loginCancle
    options.loginCancle = cancle
    options.loginClose && delete options.loginClose
    options.loginClose = close
  }
}

export default plugin
