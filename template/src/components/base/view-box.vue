<template>
  <div class="weui-tab">
    <slot name="header"></slot>
    <div class="weui-tab__panel vux-fix-safari-overflow-scrolling" ref="viewBoxBody" :id="'vux_view_box_body'+id" :style="{paddingBottom:bottom,paddingTop:top}">
      <div :class="webcss">
        <div class="ui-error" @click="refresh">
          <icon :type='nowebIcon'></icon>
          <h4 v-text="noweb"></h4>
          <div class="ui-button">
            <button class="weui_btn weui_btn_default">重新加载</button>
          </div>
        </div>
      </div>
      <div :class="customecss">
        <div class="ui-error">
          <slot name="error"></slot>
        </div>
      </div>
      <slot></slot>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<script>
  import {
    Icon
  } from 'app'

  export default {
    components: {
      Icon
    },
    data() {
      return {
        webcss: 'pro-webError',
        customecss: 'pro-webError',
        noweb: '网络不给力',
        nowebIcon: 'wifi',
        refreshs: []
      }
    },
    mounted() {
      const self = this
      this.$nextTick(function() {
        setTimeout(() => {
          self.getScrollBody().className = 'weui-tab__panel vux-fix-safari-overflow-scrolling active'
        }, 1)
      })
    },
    props: {
      id: {
        type: String,
        default: ''
      },
      top: {
        type: String,
        default: '46px'
      },
      bottom: {
        type: String,
        default: '55px'
      }
    },
    methods: {
      push_allback(callback) {
        var isIn = this.refreshs.some((item) => {
          return callback.toString() === item.toString()
        })
        if (!isIn) {
          this.refreshs.push(callback)
        }
      },
      refresh() {
        this.refreshs.forEach((cb) => {
          cb()
        })
        this.webError(false)
      },
      // dom load
      // 给刷新用的
      onload(callback) {
        this.push_allback(callback)
        $api.onload(callback)
      },
      // plus load(5+ plusReady)
      // 给刷新用的
      mounted(callback) {
        this.push_allback(callback)
        $api.mounted(callback)
      },
      webError(value, msg, icon) {
        // debugger
        if (value === false) {
          this.webcss = 'pro-webError'
        } else {
          this.webcss = 'pro-webError active'
        }
        if (msg) {
          this.noweb = msg
        } else {
          this.noweb = '网络不给力'
        }
        if (icon) {
          this.nowebIcon = icon
        } else {
          this.nowebIcon = 'wifi'
        }
      },
      // 自定义错误
      customeError(value) {
        if (value === false) {
          this.customecss = 'pro-webError'
        } else {
          this.customecss = 'pro-webError active'
        }
      },
      scrollTo(top) {
        this.$refs.viewBoxBody.scrollTop = top
      },
      getScrollTop() {
        return this.$refs.viewBoxBody.scrollTop
      },
      getScrollBody() {
        return this.$refs.viewBoxBody
      }
    }
  }
</script>
<style lang="less">
  @import '~vux/src/styles/weui/widget/weui_tab/weui_tab_tabbar';
  html,
  body {
    overflow-y: hidden;
  }
</style>
<style lang="less" scoped>
  .weui-tab__panel {
    opacity: 0;
    transition: opacity 0.45s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .weui-tab__panel.active {
    opacity: 1;
  }
  
  // webError
  .pro-webError {
    width: 100%;
    height: 100%;
    background-color: white;
    position: fixed;
    z-index: 1;
    display: none;
    .ui-error {
      text-align: center;
      margin-top: 50%;
      margin-top: 25vh;
      .iconfont {
        font-size: 50px;
        color: #949494;
      }
      .ui-button {
        width: 90px;
        padding-top: 15px;
        margin: 0 auto;
        .weui_btn {
          font-size: 14px;
        }
      }
    }
  }
  
  .pro-webError.active {
    display: block;
  }
</style>