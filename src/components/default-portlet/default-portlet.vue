<template>
  <div :class="$style.portlet">
    <div :class="$style.portlet__header">
      <div :class="$style.header">
        <h2 :class="$style.header__title">{{ label }}</h2>
        <div :class="$style.header__controls">
          <default-radio :value="value" @input="onSelect" />
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="scss" module>
  @import "../../assets/styles/mixins.scss";

  .portlet {
    background-color: #fff;
    padding: 12px 20px;
    height: 475px;
  }
  
  .portlet__header {
    padding-bottom: 20px;
    
  }

  .header {
    &:after { @include clearfix }
    min-height: 48px;
    border-bottom: 1px solid #eee;
  }

  .header__title {
    padding: 10px 0;
    float: left;
    display: inline-block;
    font-size: 15px;
    line-height: 18px;
    color: #29b4b6;
    text-transform: uppercase;
    font-weight: 700;
  }

  .header__controls {
    float: right;
    margin: 5px 0;
  }

  .controls {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    padding: 6px 0 14px;
  }

  .controls__button {
    padding: 4px 10px;
    font-size: 13px;
    line-height: 1.5;
    border-color: transparent;
    color: #94A0B2;
    background-color: transparent;
    user-select: none;
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    border: 1px solid transparent;
    white-space: nowrap;
    border-radius: 25px;
    margin-right: 10px;
    &:hover, &._active {
      background-color: #94A0B2;
      border-color: #94A0B2;
      color: #FFF;
    }
  }
</style>

<script>
  import DefaultRadio from '../default-radio/default-radio.vue';

  export default {
    name: 'default-portlet',
    props: {
      label: { default: 'Title', type: String },
      value: { type: Object }
    },
    components: { DefaultRadio },

    methods: {
      onSelect(value) {
        this.$emit('input', value);
      }
    }
  }
</script>