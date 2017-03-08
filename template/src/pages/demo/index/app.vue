<template>
  <div id="app" style="height:100%;">
    <view-box bottom="0">
      <img src="../../../assets/img/logo.png">
      <flexbox>
        <flexbox-item>
          <x-button type="primary" @click.native="testLogin">登录(刷新)</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="primary" @click.native="testLoginNoReload">登录</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="warn" @click.native="testError">webError</x-button>
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
      窗口
      <flexbox>
        <flexbox-item>
          <x-button type="primary" @click.native="home">home</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="primary" @click.native="hide">hide</x-button>
        </flexbox-item>
        <flexbox-item>
        </flexbox-item>
      </flexbox>
      <p v-for="i in 100" v-text="i"></p>
    </view-box>
  </div>
</template>

<script>
  import {
    ViewBox
  } from 'app'
  import {
    Flexbox,
    FlexboxItem,
    XButton
  } from 'vux'

  export default {
    name: 'app',
    components: {
      ViewBox,
      Flexbox,
      FlexboxItem,
      XButton
    },
    mounted() {},
    methods: {
      home() {
        $api.open(window.plus.runtime.appid)
      },
      hide() {
        var wv = plus.webview.getWebviewById('demo_index')
        wv && wv.hide()
      },
      testLogin: function() {
        $api.login()
      },
      testLoginNoReload: function() {
        $api.login(false)
      },
      testError: function() {
        $box.webError()
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
      }
    }
  }
</script>

<style>
</style>