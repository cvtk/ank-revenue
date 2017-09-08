<template>
  <div :class="[ $style.default_field, isDone && $style._done ]">
    <div :class="$style.default_field__pulse" v-if="needAttention && !fieldFocused && !isDone"></div>
    <label :for="$style.id" :class="[ $style.default_field__label, fieldIsUsed && $style._overhead ]">
      {{ label }}
    </label>
    <input v-if="type === 'number'" type="number" v-model="fieldValue"
      :class="$style.default_field__input"
      :id="$style.id"
      :min="min"
      :max="max"
      @keyup="keyUp"
      @focus="fieldFocused = true"
      @blur="fieldFocused = false"
    />
    <input v-else type="text" v-model="fieldValue"
      :class="$style.default_field__input"
      :id="$style.id"
      @keyup="keyUp"
      @focus="fieldFocused = true"
      @blur="fieldFocused = false"
    />
  </div>
</template>

<style lang="scss" module>
  .id { /* */ }

  .default_field {
    position: relative;
    padding: 12px 10px 5px;
    &._done {
      .default_field__input { border-color: #32c5d2 }
      .default_field__label { color: #777 !important }
    }

    .default_field__pulse {
      position: absolute;
      z-index: 1;
      border: 3px solid #ee6052;
      height: 30px;
      left: 10px;
      top: 12px;
      right: 10px;
      -webkit-animation: pulsate .55s ease-out;
      -webkit-animation-iteration-count: infinite; 
      opacity: 0;
    }
    @-webkit-keyframes pulsate {
      0% { opacity: 0 }
      50% { opacity: .5 }
      100% { -webkit-transform: scale(1.1, 1.4); opacity: 0;}
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
      left: 20px;
      cursor: text;
      font-family: "Arial", sans-serif;
      color: #777;
      font-size: 12px;
      transition: font-size .35s, top .35s, left .35s, color .35s;
      &._overhead {
        font-size: 11px;
        top: -2px;
        left: 10px;
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
        fieldValue: this.value,
        fieldFocused: false
      }
    },
    computed: {
      fieldIsUsed() {
        return this.fieldFocused || this.fieldValue !== '';
      },
    },
    methods: {
      keyUp() {
        this.delay( ()=> {
          this.$emit('input', this.fieldValue)
        })
      },
      delay: (function() {
        let timer = 0;
        return function(callback) {
          clearTimeout(timer);
          timer = setTimeout(callback, 550);
        }
      })(),
    }
  }
</script>