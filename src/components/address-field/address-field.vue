<template>
  <div :class="$style.address_field">
    <input type="text" ref="addressFieldInput"
      :class="[ $style.address_field__input, isFilledOut && $style._fulfilled ]"
      :placeholder="placeholder" 
      :value="fieldValue"
      @change="onChange"
      @keyup="onKeyUp"
    />
    <img :class="$style.address_field__loader" src="../../assets/icons/spin.svg" v-if="!dataReady">
    <div :class="$style.address_field__autocomplete_menu" v-show="showMenu === true">
      <autocomplete-menu ref="autocompleteMenu"
        @select = "onObjectSelect"
        @loadingStateChange = "onLoadingStateChange"
        @focusStateChange = "onFocusStateChange"
        :query="query"
        :parentId="parentId"
        :contentType="contentType"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
  .address_field {
    display: inline-block;
    position: relative;
    font-size: 0;
    .address_field__input {
      display: inline-block;
      outline: none;
      height: 30px;
      padding: 5px 10px;
      font-size: 12px;
      line-height: 1.5;
      background-color: #fff;
      border: 1px solid #ee6052;
      transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
      color: #555;
      &._fulfilled { border-color: #32c5d2 }
      &:last-child { margin-right: 0 }
    }
    .address_field__loader {
      position: absolute;
      top: 0;
      right: 0;
      width: 30px;
      height: 30px;
    }
    .address_field__autocomplete_menu { position: absolute; outline: none }
  }

</style>

<script>
  import Vue from 'vue';
  import AutocompleteMenu from './address-field--autocomplete-menu.vue';

  export default {
    name: 'address-field',
    components: { AutocompleteMenu },
    props: ['contentType', 'placeholder', 'value', 'parentId' ],
    data() {
      return {
        fieldValue: '',
        query: '',
        object: {},
        dataReady: true,
        showMenu: false
      }
    },
    watch: {
      fieldValue(value) {
        console.log(value);
        this.queryDelay( () => { this.query = value } );
      }
    },
    computed: {
      isFilledOut() {
        if ( this.fieldValue === this.object.name ) {
          this.$emit('input', this.object);
          return true;
        }
      }
    },
    created() {
      if ( typeof this.value !== 'undefined' ) {
        this.fieldValue = this.value;
      }
    },
    methods: {
      onChange(event) {
        let value = event.target.value;
        this.fieldValue = value;
      },
      onKeyUp(event) {
        if ( event.keyCode === 40 || event.keyCode === 38 ) {
          this.$refs.autocompleteMenu.$el.focus();
        }
      },
      onFocusStateChange(state) {
        this.$refs.addressFieldInput.focus();
      },
      onLoadingStateChange(state) {
        if ( state ) { this.dataReady = true; this.showMenu = true }
        else this.dataReady = false;
      },
      onObjectSelect(object) {
        this.showMenu = false;
        this.object = object;
        this.fieldValue = object.name;
      },
      queryDelay: (function() {
        let timer = 0;
        return function(callback) {
          clearTimeout(timer);
          timer = setTimeout(callback, 750);
        }
      })(),
    }
  }
</script>