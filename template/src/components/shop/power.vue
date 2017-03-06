<template>
  <div id="app" style="height:100%;">
    <view-box bottom="0" id="_power">
      <x-header slot="header" :left-options="{showBack:true,preventGoBack:true,backText:'取消'}" @on-click-back="back()">权限不足</x-header>
      权限不足
    </view-box>
  </div>
</template>

<script>
  import {
    ViewBox,
    XHeader,
    Icon
  } from 'app'
  import {
    Group
  } from 'vux'

  export default {
    components: {
      Icon,
      ViewBox,
      XHeader,
      Group
    },
    methods: {
      back() {
        // 关闭,也就是取消
        $api.powerClose()
      }
    }
  }
</script>

<style lang="less" scoped>

</style>