<template>
  <div :class="$style.app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss" module>
  .app { @import "normalize.css" }
  
</style>

<script>
  export default {
    name: 'app',
  }
</script>
