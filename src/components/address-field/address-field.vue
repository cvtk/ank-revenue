<template>
  <div :class="$style.address_field">
    <default-field :value="value" type="text"
      ref="addressFieldInput"
      :label="label"
      :isDone="isDone"
      :needAttention="false"
      @input.native="onInput"
      @keyup.native="onKeyup"
      @blur="onBlur"
    />
    <img :class="$style.address_field__loader" src="../../assets/icons/spin.svg" v-if="!dataReady">
    <div :class="$style.address_field__autocomplete_menu" v-show="showMenu === true">
      <autocomplete-menu ref="autocompleteMenu"
        @select = "onObjectSelect"
        @loadingStateChange = "onLoadingStateChange"
        :isDone="isDone"
        :query="value"
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
    width: 100%;
    }
  .address_field__loader {
    position: absolute;
    top: 14px;
    right: 2px;
    width: 26px;
    height: 26px;
    z-index: 5;
  }
  .address_field__autocomplete_menu {
    position: absolute;
    outline: none;
    z-index: 5;
    width: 100%;
  }


</style>

<script>
  import Vue from 'vue';
  import DefaultField from '../default-field/default-field.vue';
  import AutocompleteMenu from './address-field--autocomplete-menu.vue';

  export default {
    name: 'address-field',
    components: { AutocompleteMenu, DefaultField },
    props: ['contentType', 'label', 'value', 'parentId', 'isDone' ],
    data() {
      return {
        query: '',
        dataReady: true,
        showMenu: false
      }
    },
    methods: {
      onKeyup(event) {
        if ( event.keyCode === 40 ) {
          this.$refs.autocompleteMenu.onKeyup('down');
        }
        else if ( event.keyCode === 38 ) {
          this.$refs.autocompleteMenu.onKeyup('up');
        }
        else if ( event.keyCode === 13 ) {
          this.$refs.autocompleteMenu.onKeyup('enter');
        }
        else if ( event.keyCode === 27 ) { this.onBlur() }
      },

      onInput(event) { this.$emit('input', event.target.value) },

      onBlur() { setTimeout(function() { this.showMenu = false }, 150) },

      onLoadingStateChange(state) {
        if ( state ) { this.dataReady = true; this.showMenu = true }
        else this.dataReady = false;
      },

      onObjectSelect(object) {
        this.showMenu = false;
        this.$emit('objectSelect', object);
      },
      delay: (function() {
        let timer = 0;
        return function(callback) {
          clearTimeout(timer);
          timer = setTimeout(callback, 150);
        }
      })()
    }
  }
</script>