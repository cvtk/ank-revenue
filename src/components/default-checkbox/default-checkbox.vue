<template>
  <div :class="$style.checkbox">
    <input :class="$style.checkbox__input" v-model="checked" :id="id" type="checkbox" @change="onChange" />
    <label :class="$style.checkbox__label" :for="id">
      <span :class="$style.checkbox__check"></span>
      <span :class="$style.checkbox__box"></span>
      {{ label }}
    </label>
  </div>
      
</template>

<style lang="scss" module>
    
  .checkbox {
    position: relative;
    .checkbox__input:checked ~ label > .checkbox__check {
      opacity: 1;
      -webkit-transform: scale(1) rotate(45deg);
      -moz-transform: scale(1) rotate(45deg);
      transform: scale(1) rotate(45deg);
    }
    .checkbox__input:checked ~ label > .checkbox__box {
      display: none;
    }
  }

  .checkbox__input {
    visibility: hidden;
    position: absolute;
  }

  .checkbox__label {
    position: relative;
    cursor: pointer;
    padding-left: 30px;
    font-size: 13px;
  }

  .checkbox__check {
    display: block;
    position: absolute;
    top: -4px;
    left: 6px;
    width: 10px;
    height: 20px;
    border: 2px solid #36c6d3;
    border-top: none;
    border-left: none;
    opacity: 0;
    z-index: 5;
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  .checkbox__box {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    border: 2px solid #666;
    height: 20px;
    width: 20px;
    z-index: 5;
  }

</style>

<script>

  export default {
    name: 'default-checkbox',
    props: ['value', 'label'],
    data() {
      return {
        id: Math.random().toString(36).substring(7),
        checked: false
      }
    },
    created() {
      this.checked = this.value
    },
    methods: {
      onChange() {
        this.$emit('input', this.checked)
      }
    }
  }
</script>