<template>
  <div id="app" style="height:100%;">
    <view-box>
      <x-header slot="header">
        选择平台
      </x-header>
      <tabbar>
        <tabbar-item selected>
          <icon slot="icon" type="homeon" style=" color: #333;"></icon>
          <span slot="label">首页</span>
        </tabbar-item>
      </tabbar>
    </view-box>
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
    Group,
    Tabbar,
    TabbarItem
  } from 'vux'

  export default {
    name: 'app',
    components: {
      ViewBox,
      XHeader,
      Icon,
      Group,
      Tabbar,
      TabbarItem
    }
  }
</script>

<style lang="less">

</style>