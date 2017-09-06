<template>
  <div :class="$style.address_field">
    <input type="text" :class="[ $style.address_field__input, isFilledOut && $style._fulfilled ]"
      :placeholder="label" 
      :value="fieldValue"
      @keyup="onKeyUp"
    />
    <img :class="$style.address_field__loader" src="../../assets/icons/spin.svg" v-if="!dataReady">
    <div :class="$style.address_field__autocomplete_menu">
      <autocomplete-menu contentType="city" ref="autocompleteMenu"
        @select = "onObjectSelect"
        @loadingStateChange = "onLoadingStateChange"
        :query="query"
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
      &:focus { border-color: #4E5966 }
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
    props: ['type'],
    data() {
      return {
        label: '',
        fieldValue: '',
        query: '',
        object: {},
        dataReady: true
      }
    },
    computed: {
      isFilledOut() {
        return this.fieldValue === this.object.name;
      }
    },
    methods: {
      onKeyUp(event) {
        if ( event.keyCode === 40 || event.keyCode === 38 ) {
          this.$refs.autocompleteMenu.$el.focus();
        }
        let value = event.target.value;
        this.fieldValue = value;
        this.query = value;
      },
      onLoadingStateChange(state) {
        if ( state ) this.dataReady = true
        else this.dataReady = false;
      },
      onObjectSelect(object) {
        this.query = '';
        this.object = object;
        this.fieldValue = object.name;
      }
    }
  }
</script>