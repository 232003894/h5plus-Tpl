<template>
  <vux-header :left-options="{showBack:leftOptions.showBack!==false,backText:leftOptions.backText||'返回',preventGoBack:true}" :title="title" :transition="transition" :right-options="{showMore: rightOptions.showMore===true}" @on-click-title="$emit('on-click-title')"
    @on-click-more="$emit('on-click-more')" @on-click-back="onClickBack">
    <slot></slot>
    <template slot="left">
      <slot name="left"></slot>
    </template>
    <template slot="right">
      <slot name="right"></slot>
    </template>
  </vux-header>
</template>

<script>
  import VuxHeader from 'vux/src/components/x-header'
  export default {
    components: {
      VuxHeader
    },
    props: {
      leftOptions: {
        type: Object,
        default () {
          return {
            showBack: true,
            backText: '返回',
            preventGoBack: false
          }
        }
      },
      title: String,
      transition: String,
      rightOptions: {
        type: Object,
        default () {
          return {
            showMore: false
          }
        }
      }
    },
    methods: {
      onClickBack() {
        if (this.leftOptions.preventGoBack) {
          this.$emit('on-click-back')
        } else {
          // 直接后退
          $api.back()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .vux-header {
    width: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 100;
  }
</style>