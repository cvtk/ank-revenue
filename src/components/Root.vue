<template>
  <div :class="$style.root">
    <div :class="$style._row">
      <div :class="$style.root__portlet"></div>
      <div :class="$style.root__portlet"></div>
    </div>
    <div :class="$style._row">
      <div :class="$style.root__portlet"></div>
      <div :class="$style.root__portlet"></div>
    </div>
  </div>
</template>

<style lang="scss" module>
  @import "../assets/styles/mixins.scss";

  .root { /* */ }

  ._row {
    &:after { @include clearfix }
    margin-left: -15px;
    margin-right: -15px;
  }

  .root__portlet {
    width: 50%;
    float: left;
  }
  
</style>

<script>
  export default {
    name: 'root'
  }
</script>