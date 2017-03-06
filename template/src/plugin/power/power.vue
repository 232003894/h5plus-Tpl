<template>
  <div>
    <popup v-model="show" height="100%">
      <Power></Power>
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
    Power
  } from 'app'

  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    components: {
      Power,
      Popup
    }
  }
</script>
<style>

</style>