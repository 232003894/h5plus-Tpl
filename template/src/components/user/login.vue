<template>
  <div id="app" style="height:100%;">
    <view-box bottom="0" id="_login">
      <x-header slot="header" :left-options="{showBack:true,preventGoBack:true,backText:'取消'}" @on-click-back="back()" style="width:100%;position:absolute;left:0;top:0;z-index:100;">登录</x-header>
      <br>
      <group label-width="5em">
        <x-input title="账号" data-vv-as="用户名或手机号" v-validate:test1="'required|username'" name="test1" v-model="test1" novalidate :icon-type="errors.has('test1')?'error':''">
          <span slot=right>fd</span>
        </x-input>
        <x-input title="密码" type="password" data-vv-as="密码" v-validate:test2="'required|min:6|max:8|strong:2'" name="test2" v-model="test2" novalidate :icon-type="errors.has('test2')?'error':''">
          <span slot=right>fd</span>
        </x-input>
      </group>
      <flexbox>
        <flexbox-item>
          <x-button type="default" @click.native="testCancle">取消登录</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="primary" @click.native="testClose">完成登录</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="warn" @click.native="testV">testV</x-button>
        </flexbox-item>
      </flexbox>
    </view-box>
  </div>
</template>

<script>
  import {
    ViewBox,
    XHeader
  } from 'app'
  import {
    Group,
    XInput,
    Flexbox,
    FlexboxItem,
    XButton
  } from 'vux'

  export default {
    components: {
      XInput,
      Group,
      Flexbox,
      FlexboxItem,
      ViewBox,
      XHeader,
      XButton
    },
    data() {
      return {
        test1: '',
        test2: ''
      }
    },
    mounted() {
      document.addEventListener('logined', function(e) {
        $api.loginClose()
        // 登录完成的相关实现。。。
        // e.detail为数据对象（data）
      })
    },
    methods: {
      testV() {
        var self = this
        this.$validator.validateAll().then(() => {
          $api.log('验证通过')
        }).catch(() => {
          $api.log(self.errors.all()[0])
        })
      },
      testClose: function() {
        $api.loginClose()
      },
      testCancle: function() {
        $api.loginCancle()
      },
      testError: function() {
        $box.webError()
      },
      back() {
        // 关闭login,也就是取消登录
        $api.loginCancle()
      }
    }
  }
</script>

<style lang="less">

</style>