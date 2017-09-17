<template>
  <transition name="loader" appear>
    <div :class="$style.loader">
      <img src="../../assets/icons/spin.svg" :class="$style.loader__spinner" id="jJ_h21J">
    </div>
  </transition>
</template>

<style>
  .loader-enter,
  .loader-leave-to {
    opacity: 0;
  }

  .loader-enter #jJ_h21J,
  .loader-leave-to #jJ_h21J {
    transform: scale(1.1);
  }

</style>

<style lang="scss" module>
  .loader {
    position: absolute;
    top: 0; bottom: 0;
    left: 0; right: 0;
    background-color: #fff;
    z-index: 8998;
    transition: opacity .3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loader__spinner {
    padding: 0;
    z-index: 8999;
    transition: all .3s;
    width: 60px;
    height: 60px;
  }
</style>

<script>
  export default { name: 'default-loader' }
</script>