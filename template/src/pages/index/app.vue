<template>
  <div id="app" style="height:100%;">
    <view-box>
      <x-header slot="header" @on-click-back="test" :left-options="{preventGoBack: true}">
        头部
        <span slot="left">123</span>
      </x-header>
      <div slot="error" style="text-align: left;margin-left: 50px;" @click.self="customeError(false)">
        出错了-(点击关闭)
        <br> 您可以：
        <br> 1.aaaaaaa
        <br> 2.bbbbbbbb
      </div>
      <div style="height:24px;">
        <sticky scroll-box="vux_view_box_body" :offset="46">
          <div>Blabla</div>
        </sticky>
      </div>
      <img src="../../assets/img/logo.png">
      <p>\{{ date | formatDate('yy-MM-dd') }}</p>
      <p>\{{ str | capitalize }}</p>
      <p>\{{ money | currency({thousand:''}) }}</p>
      <p>\{{ money | number({thousand:' '}) }}</p>
      <br>
      <div>
        <flexbox>
          <flexbox-item>
            <x-button type="warn" @click.native="customeError">业务错误</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button type="warn" @click.native="testError">webError</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button type="primary" @click.native="testOpen">Open</x-button>
          </flexbox-item>
        </flexbox>
        登录测试
        <flexbox>
          <flexbox-item>
            <x-button type="primary" @click.native="testLogin">登录(必须)</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button type="primary" @click.native="testLoginNoReload">登录</x-button>
          </flexbox-item>
          <flexbox-item>
          </flexbox-item>
        </flexbox>
        权限测试
        <flexbox>
          <flexbox-item>
            <x-button type="primary" @click.native="testPower">权限(必须)</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button type="primary" @click.native="testPowerNoReload">权限</x-button>
          </flexbox-item>
          <flexbox-item>
          </flexbox-item>
        </flexbox>
        Toast-UI测试
        <flexbox>
          <flexbox-item>
            <x-button type="primary" @click.native="testToast(10000,false)">10秒</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button type="primary" @click.native="testToast(2000,false)">2秒</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button type="primary" @click.native="testToastClose(false)">toastClose</x-button>
          </flexbox-item>
        </flexbox>
        Toast-Native测试
        <flexbox>
          <flexbox-item>
            <x-button @click.native="testToast(10000,true)">long</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button @click.native="testToast(2000,true)">short</x-button>
          </flexbox-item>
          <flexbox-item>
          </flexbox-item>
        </flexbox>
        Alert测试
        <flexbox>
          <flexbox-item>
            <x-button type="primary" @click.native="testAlert(false)">Alert</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button type="primary" @click.native="testAlertClose(false)">alertClose</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button @click.native="testAlert(true)">Native</x-button>
          </flexbox-item>
        </flexbox>
        Confirm测试
        <flexbox>
          <flexbox-item>
            <x-button type="primary" @click.native="testConfirm(false)">Confirm</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button type="primary" @click.native="testConfirmClose(false)">confirmClose</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button @click.native="testConfirm(true)">Native</x-button>
          </flexbox-item>
        </flexbox>
        Loading测试
        <flexbox>
          <flexbox-item>
            <x-button type="primary" @click.native="testLoadingClose(false)">Loading</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button @click.native="testLoadingClose(true)">Native</x-button>
          </flexbox-item>
          <flexbox-item>
          </flexbox-item>
        </flexbox>
      </div>
      <p v-for="i in 40" v-text="i"></p>
      <tabbar icon-class="vux-center" slot="bottom">
        <tabbar-item>
          <span slot="label">底部</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
  import {
    ViewBox,
    XHeader
  } from 'app'

  import {
    Flexbox,
    FlexboxItem,
    Tabbar,
    TabbarItem,
    XButton,
    Sticky
  } from 'vux'

  export default {
    name: 'app',
    components: {
      ViewBox,
      XHeader,
      Flexbox,
      FlexboxItem,
      Tabbar,
      TabbarItem,
      XButton,
      Sticky
    },
    data() {
      return {
        date: '/Date(1373021259229)/',
        str: 'aBc',
        money: 12312.615,
        json: {
          a: 1,
          b: 2,
          c: 'test'
        }
      }
    },
    mounted() {
      document.addEventListener('logined', function(e) {
        console.log('index logined')
      })
      // console.log(JSON.stringify(window.common, null, 2))
      // $api.log($api.toastClose)
      $api.mounted(() => {})
      // $box.scrollTo(190)
      $box.onload(() => {
        $api.log('刷新用的 dom onload')
      })
      $box.mounted(() => {
        this.testAjax()
        $api.log('刷新用的 plus ready')
      })
    },
    methods: {
      testOpen() {
        $api.open('demo_index')
        // setTimeout(() => {
        //   var wv = plus.webview.getWebviewById('demo_index')
        //   wv && wv.hide()
        // }, 5000)
      },
      testLoadingClose(nativeFirst) {
        $api.loading('消息123', {
          nativeFirst: nativeFirst,
          onShow: () => {
            setTimeout(() => {
              $api.loadingClose()
            }, 10000)
            console.log('loading onShow')
          },
          onHide: () => {
            console.log('loading onHide')
          }
        })
      },
      testConfirm(nativeFirst) {
        $api.confirm('消息123', {
          title: '标题',
          nativeFirst: nativeFirst,
          confirmText: 'YES',
          cancelText: 'NO',
          onShow: () => {
            console.log('confirm onShow')
          },
          onHide: () => {
            console.log('confirm onHide')
          },
          onConfirm: () => {
            console.log('confirm 确定')
          },
          onCancel: () => {
            console.log('confirm 取消')
          }
        })
      },
      testConfirmClose(nativeFirst) {
        $api.confirm('消息123', {
          title: '标题',
          confirmText: 'YES',
          cancelText: 'NO',
          onShow: () => {
            setTimeout(() => {
              $api.confirmClose()
            }, 1000)
          },
          onHide: () => {
            console.log('confirm onHide')
          },
          onConfirm: () => {
            console.log('confirm 确定')
          },
          onCancel: () => {
            console.log('confirm 取消')
          }
        })
      },
      testAlert(nativeFirst) {
        $api.alert('消息123', {
          title: '标题',
          nativeFirst: nativeFirst,
          buttonText: '知道了',
          onShow: () => {
            console.log('alert onShow')
          },
          onHide: () => {
            console.log('alert onHide')
          }
        })
      },
      testAlertClose(nativeFirst) {
        $api.alert('消息123', {
          title: '标题',
          nativeFirst: nativeFirst,
          buttonText: '知道了',
          onShow: () => {
            setTimeout(() => {
              $api.alertClose()
            }, 1000)
          },
          onHide: () => {
            console.log('alert onHide')
          }
        })
      },
      testToast(time, nativeFirst) {
        $api.toast('消息123', {
          time: time,
          nativeFirst: nativeFirst,
          onShow: () => {
            console.log('toast alertonShow')
          },
          onHide: () => {
            console.log('toast onHide')
          }
        })
      },
      testToastClose(nativeFirst) {
        $api.toast('消息123', {
          time: 50000,
          nativeFirst: nativeFirst,
          onShow: () => {
            setTimeout(() => {
              $api.toastClose()
            }, 1000)
          },
          onHide: () => {
            console.log('toast onHide')
          }
        })
      },
      testLogin: function() {
        $api.login(true, () => {
          console.log('loginCallback')
        })
      },
      testLoginNoReload: function() {
        $api.login(false, () => {
          console.log('loginCallback')
        })
      },
      testPower: function() {
        $api.power(true, () => {
          console.log('loginCallback')
        })
      },
      testPowerNoReload: function() {
        $api.power(false, () => {
          console.log('loginCallback')
        })
      },
      testError: function() {
        $box.webError()
      },
      customeError(val) {
        $box.customeError(val)
      },
      test() {
        $api.toast('Header Title Click 测试')
      },
      testAjax() {
        axios.get('Advertisement', {
          params: {
            s_id: 1,
            w: 0
          },
          app: {
            webError: $box.webError,
            load: true,
            loginCallback: () => {
              console.log('loginCallback')
            }
          },
          timeout: 3000
        }).then(response => {
          // 处理返回的 response
          console.log('返回' + response)
        }).catch(err => {
          // 处理错误
          console.log('错误' + err)
        })
        // http://211.149.193.19:8080/api/customers
        // Advertisement
        // var test1 = () => {
        //   return axios.get('Advertisement', {
        //     params: {
        //       s_id: 1,
        //       w: 0
        //     },
        //     app: {
        //       webError: $box.webError,
        //       load: true,
        //       loginCallback: () => {
        //         console.log('loginCallback')
        //       }
        //     },
        //     timeout: 3000
        //   })
        // }
        // var test2 = () => {
        //   return axios.get('http://211.149.193.19:8080/api/customers', {
        //     params: {
        //       adv_gid: 2,
        //       s_id: 1
        //     },
        //     app: {
        //       webError: $box.webError,
        //       load: true
        //     },
        //     timeout: 3000
        //   })
        // }
        // $api.loading()

        // axios.all([test2()])
        //   .then(axios.spread(function(acct, perms) {
        //     setTimeout(() => {
        //       $api.loadingClose()
        //     }, 150)
        //     // debugger
        //     // 两个请求现在都执行完成
        //   }), function(response) {
        //     // debugger
        //     setTimeout(() => {
        //       $api.loadingClose()
        //     }, 150)
        //     // 两个请求现在都执行完成
        //   })
        // axios.get('Advertisement', {
        //   params: {
        //     adv_gid: 3,
        //     s_id: 1
        //   },
        //   app: {
        //     webError: $box.webError,
        //     load: true
        //   },
        //   timeout: 100000
        // }).then(response => {
        //   // 处理第一次返回的 response
        //   console.log('第一次返回' + response)
        //   return axios.get('http://211.149.193.19:8080/api/customers', {
        //     params: {
        //       adv_gid: 2,
        //       s_id: 1
        //     },
        //     app: {
        //       webError: $box.webError,
        //       load: true
        //     },
        //     timeout: 3000
        //   })
        // }).then(response => {
        //   // 处理第二次返回的 response
        //   console.log('第二次返回' + response)
        // }).catch(err => {
        //   // 处理错误
        //   console.log('错误' + err)
        // })
      }
    }
  }
</script>

<style lang="less">
</style>