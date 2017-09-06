<template>
  <div :class="$style.address_field">
    <input type="text" :class="$style.address_field__input" 
      :placeholder="label"
      v-model="fieldValue"
      @keypress="onTyping"
      ref="addressField">
    <div :class="$style.address_field__autocomplete_menu" v-if="searchResults.length > 0">
      <ul :class="$style.autocomplete_menu" tabindex="0" ref="autocompleteMenu" @keypress="onArrowSelect">
        <li :class="[ $style.autocomplete_menu__item, selectedItem === index && $style._active ]"
          v-for="( item, index ) in searchResults"
          :key="item.id"
          @mouseover="selectedItem = index"
          @click="selectedObject = item">
        {{ item.name }} (<span :class="$style._light">{{ item.type }}</span>
        <span :class="$style._light" v-for="parent in item.parents">, {{ parent.name }} {{ parent.typeShort }}</span>)
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" module>
  .address_field {
    display: inline-block;
    position: relative;
    padding: 10px;
    border: 1px solid #c2cad8;
    font-size: 0;
    .address_field__input {
      display: inline-block;
      outline: none;
      margin-right: 10px;
      height: 30px;
      padding: 5px 10px;
      font-size: 12px;
      line-height: 1.5;
      background-color: #fff;
      border: 1px solid #c2cad8;
      transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
      color: #555;
      &:focus { border-color: #4E5966 }
      &:last-child { margin-right: 0 }
    }
    .address_field__autocomplete_menu { position: absolute }
  }

  .autocomplete_menu {
    list-style: none;
    border: 1px solid #c2cad8;
    background-color: #fff;
    margin-top: -1px;
    width: 280px;
    .autocomplete_menu__item {
      display: block;
      border: none;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #4E5966;
      padding: 5px 10px;
      font-size: 12px;
      line-height: 1;
      cursor: pointer;
      &._active { background-color: #e7ecf1 }
      ._light { font-size: 12px; font-weight: 300 }
    }
  }
</style>

<script>
  import Vue from 'vue';
  import VueResource from 'vue-resource';
 
  Vue.use(VueResource);

  const apiUrl = 'https://kladr-api.ru/api.php';

  export default {
    name: 'address-field',
    props: ['type'],
    data() {
      return {
        label: '',
        fieldValue: '',
        selectedObject: {},
        searchResults: {},
        selectedItem: -1
      }
    },
    methods: {
      onArrowSelect(event) {
        if ( event.keyCode === 38 && this.selectedItem > 0 ) {
          this.selectedItem -= 1;
        }
        else if ( event.keyCode === 38 && this.selectedItem === 0 ) {
          this.selectedItem = -1;
          this.$refs.addressField.focus();
        }
        else if ( event.keyCode === 40 && this.selectedItem < this.searchResults.length - 1 ) {
          this.selectedItem += 1;
        }
        else if ( event.keyCode === 27 ) {
          this.selectedItem = -1;
          this.$refs.addressField.focus();
        }
        else if ( event.keyCode === 13 && this.selectedItem !== -1 ) {
          console.log(event)
          this.selectedObject = this.searchResults[this.selectedItem];
          this.fieldValue = this.selectedObject.name;
        }
        return false;
      },
      onTyping(event) {
        if ( event.keyCode === 40 ) {
          this.$refs.autocompleteMenu.focus();
          this.selectedItem = 0;
        }
        if ( event.keyCode === 38 ) {
          this.$refs.autocompleteMenu.focus();
          this.selectedItem = this.searchResults.length - 1;
        }
        if ( this.type === 'city' && this.fieldValue.length > 2 ) {
          this.getCityByName(this.fieldValue).then( (response) => {
            this.searchResults = response.body.result;
          });
        }
        return false;
      },

      getCityByName(name, type, page) {
        let limit = 5,
            pageNum = page,
            typeCode = type;

        ( typeof pageNum === 'undefined' ) && ( pageNum = 0 );
        ( typeof typeCode === 'undefined' ) && ( typeCode = 7 );

        return this.$http.jsonp(apiUrl, {
          params: {
            contentType: 'city',
            typeCode: typeCode,
            withParent: 1,
            query: name,
            limit: limit,
            offset: pageNum * limit
          }
        });
      }
    },
    created() {
      if ( this.type === 'city' ) {
        this.fieldValue = 'Ярославль';
        this.label = 'Город';
      }
    }
  }
</script>