<template>
  <span :class="[ $style.button, red && $style._red, icon && $style[ '_icon_' + icon ] ]">{{ label }}</span>
</template>

<style lang="scss" module>
    
  .button {
    display: inline-block;
    color: #fff;
    background-color: #32c5d2;
    font-weight: 600;
    touch-action: manipulation;
    cursor: pointer;
    border: 1px solid #32c5d2;
    outline: none;
    white-space: nowrap;
    padding: 7.5px 10px;
    font-size: 14px;
    user-select: none;
    line-height: 12px;
    transition: border-color .25s, background-color .25s;
    &:hover {
      background-color: #26a1ab;
      border-color: #2499a3;
    }
    &._red {
      background-color: #ee6052;
      border: 1px solid #ee6052;
      &:hover {
        background-color: #e12330;
        border-color: #dc1e2b;
      }
    }
    &._icon_plus:after {
      content: "";
      display: inline-block;
      background-image: url("../../assets/icons/plus.svg");
      background-repeat: no-repeat;
      background-size: 100%;
      width: 12px;
      height: 12px;
    }
    &._icon_trash:after {
      content: "";
      display: inline-block;
      background-image: url("../../assets/icons/tresh.svg");
      background-repeat: no-repeat;
      background-size: 100%;
      width: 12px;
      height: 12px;
    }
  }

</style>

<script>

  export default {
    name: 'default-button',
    props: ['label', 'red', 'icon'],
  }
</script>