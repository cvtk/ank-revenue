<template>
  <div :class="[ $style.radio, small && $style._small ]">
    <span v-for="( radio, index ) in local.items" @click="onClick(index)"
      :class="[ $style.radio__button, index === current && $style._active ]" 
      :title="radio.title">
      {{ radio.label }}
    </span>
  </div>
</template>

<style lang="scss" module>
  .radio {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    &._small {
      .radio__button {
        font-family: "Arial", sans-serif;
        font-weight: 300;
        font-size: 12px;
        padding: 4px 7px;
        line-height: 1;
        border: none;
      }
    }
  }

  .radio__button {
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
  export default {
    name: 'default-radio',
    props: {
      small: { default: false, type: Boolean },
      value: {
        default() { return {current: 'value', items: [ { label: 'label', title: 'title', value: 'value', isActive: true } ] } },
        type: Object
      }
    },
    data() {
      return {
        current: null,
        local : this.value
      }
    },
    created() {
      this.local.items.forEach( (radio, index) => {
        if ( radio.value === this.local.current ) this.current = index;
      });
    },
    methods: {
      onClick(index) {
        this.current = index;
        this.local.items[this.current].isActive = false;
        this.local.items[index].isActive = true;
        this.local.current = this.local.items[index].value;
        
        this.$emit('input', this.local);
      }
    }
  }
</script>