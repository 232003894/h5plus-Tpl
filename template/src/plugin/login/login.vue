<template>
  <div>
    <popup v-model="show" height="100%">
      <Login></Login>
    </popup>
  </div>
</template>

<script>
  /** vux components */
  import {
    Popup
  } from 'vux'
  /** project components */
  import {
    Login
  } from 'app'

  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    components: {
      Login,
      Popup
    }
  }
</script>
<style>

</style>