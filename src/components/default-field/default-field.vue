<template>
  <div :class="[ $style.default_field, isDone && $style._done ]">
    <div :class="$style.default_field__pulse" v-if="needAttention && !fieldFocused && !isDone"></div>
    <label :for="id" 
      :class="[ $style.default_field__label, (fieldIsUsed || type === 'custom') && $style._overhead ]">
      {{ label }}
    </label>
    <div v-if="type === 'custom'" :id="id" 
      :class="$style.default_field__input">
      <slot></slot>
    </div>
    <input v-if="type === 'number'" type="number" :value="value"
      :class="$style.default_field__input"
      :id="id"
      :min="min"
      :max="max"
      @input="onInput"
      @focus="fieldFocused = true"
      @blur="onBlur"
    />
    <input v-if="type === 'text'" type="text" :value="value"
      :class="$style.default_field__input"
      :id="id"
      @input="onInput"
      @focus="fieldFocused = true"
      @blur="onBlur"
    />
    <input v-if="type === 'password'" type="password" :value="value"
      :class="$style.default_field__input"
      :id="id"
      @input="onInput"
      @focus="fieldFocused = true"
      @blur="onBlur"
    />
    
    </div>
  </div>
</template>

<style lang="scss" module>

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  .default_field {
    position: relative;
    padding-top: 12px;
    &._done {
      .default_field__input { border-color: #32c5d2 }
      .default_field__label { color: #777 !important }
    }

    .default_field__pulse {
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
    .default_field__input {
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

    .default_field__label {
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
    name: 'default-field',
    props: ['label', 'value', 'isDone', 'type', 'min', 'max', 'needAttention' ],
    data() {
      return {
        fieldFocused: false,
        id: Math.random().toString(36).substring(7)
      }
    },
    computed: {
      fieldIsUsed() {
        return this.fieldFocused || this.value !== '';
      },
    },
    methods: {
      onBlur(event) { this.fieldFocused = false; this.$emit('blur') },
      onInput(event) { this.$emit('input', ( this.type === 'number' ) ? parseInt(event.target.value) : event.target.value ) }
    }
  }
</script>