<template>
  <div :class="[ $style.select, isDone && $style._done ]">
    <div :class="$style.select__pulse" v-if="needAttention && !isDone"></div>
    <label :for="id" 
      :class="[ $style.select__label, $style._overhead ]">
      {{ label }}
    </label>

    <select :class="$style.select__input" :id="id" @change="onChange">
      <option  disabled selected> Выбрать значение </option>
      <option  v-for="(option, index) in options" :value="index"> {{ option.name }} </option>
    </select>
    
    </div>
  </div>
</template>

<style lang="scss" module>

  .select {
    position: relative;
    padding-top: 12px;
    &._done {
      .select__input { border-color: #32c5d2 }
      .select__label { color: #777 !important }
    }

    .select__pulse {
      position: absolute;
      z-index: 1;
      border: 3px solid #ee6052;
      height: 30px;
      left: 0;
      top: 12px;
      right: 0;
      -webkit-animation: pulsate .55s ease-out;
      -webkit-animation-iteration-count: infinite; 
      opacity: 0;
    }
    @-webkit-keyframes pulsate {
      0% { opacity: 0 }
      50% { opacity: .5 }
      100% { -webkit-transform: scale(1.05, 1.4); opacity: 0;}
    }
    .select__input {
      display: inline-block;
      position: relative;
      z-index: 2;
      outline: none;
      width: 100%;
      height: 30px;
      padding: 5px 0 5px 10px;
      font-size: 13px;
      line-height: 30px;
      background-color: #fff;
      border: 1px solid #ee6052;
      transition: border-color .25s;
      color: #555;
    }

    .select__label {
      position: absolute;
      z-index: 3;
      top: 19px;
      left: 10px;
      cursor: text;
      font-family: "Arial", sans-serif;
      color: #777;
      font-size: 12px;
      transition: font-size .15s, top .15s, left .15s, color .15s;
      &._overhead {
        font-size: 11px;
        top: -3px;
        left: 0;
        color: #ee6052;
      }
    }
  }
</style>

<script>

  export default {
    name: 'default-select',
    props: ['label', 'isDone', 'needAttention', 'options' ],
    data() {
      return {
        id: Math.random().toString(36).substring(7)
      }
    },
    methods: {
      onChange(event) { this.$emit('change', event.target.value ) }
    }
  }
</script>