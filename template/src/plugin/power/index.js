import myMsg from './power.vue'

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
     * 店铺权限提示
     * @param {any} necessary
     */
    const show = (necessary) => {
      /**
       * 回调：
       * 有些操作或请求会验证店铺权限，不足时会自动弹出提示
       */
      // 是否
      // necessary === undefined
      if (typeof necessary !== 'boolean') {
        necessary = true
      }
      $vm.necessary = necessary

      options.addMsgBack({
        name: 'shop-power',
        index: 50,
        handle: function () {
          // options.log('login cancle')
          if ($vm.show === true) {
            close()
            return false
          }
          return true
        }
      })
      $vm.show = true
    }

    /**
     * 取消,关闭
     */
    const close = () => {
      if ($vm.show === true) {
        if ($vm.necessary) {
          // 来源页面 需要权限才能够加载
          if (options.os.plus) {
            if (options.plusBack()) {
              // 关闭
              hide()
            }
          } else {
            if (options.canHistoryBack() && window.history.length > 1) {
              window.history.back()
              // 关闭
              hide()
            } else {
              // 直接后退
              $api.back()
            }
          }
        } else {
          // 来源页面 不是需要权限才能够加载，而是某个请求
          hide()
        }
      }
    }

    /**
     * 关闭登录层
     */
    const hide = () => {
      // 去掉login back action
      options.removeMsgBack('shop-power', 50)
      if ($vm.show === true) {
        // 关闭登录层
        $vm.show = false
        // 重置属性
        $vm.necessary = false
      }
    }

    options.power && delete options.power
    options.power = show
    options.powerClose && delete options.powerClose
    options.powerClose = close
  }
}

export default plugin
