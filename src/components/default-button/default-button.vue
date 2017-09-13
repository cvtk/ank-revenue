<template>
  <span :class="$style.button">{{ label }}</span>
</template>

<style lang="scss" module>
    
  .button {
    display: block;
    float: right;
    color: #fff;
    background-color: #32c5d2;
    font-weight: 600;
    touch-action: manipulation;
    cursor: pointer;
    border: 1px solid #32c5d2;
    outline: none;
    white-space: nowrap;
    padding: 6px 12px;
    font-size: 14px;
    user-select: none;
    line-height: 20px;
    transition: border-color .25s, background-color .25s;  
    &:hover {
      background-color: #26a1ab;
      border-color: #2499a3;
    }
  }

</style>

<script>

  export default {
    name: 'default-button',
    props: ['label'],
  }
</script>