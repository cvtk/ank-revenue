<template>
  <ul :class="$style.autocomplete_menu" tabindex="0"
    @keyup="onKeyUp"
    @focus="onFocus">
    <autocomplete-menu-item v-for="( item, index ) in results"
      :contentType="contentType"
      :item="item"
      :key="item.id"
      :isActive="focusedItem === index"
      @onSelect="selectItem"
    />
  </ul>
</template>

<style lang="scss" module>
  .autocomplete_menu {
    list-style: none;
    outline: none;
    border: 1px solid #c2cad8;
    background-color: #fff;
    margin-top: -1px;
    width: 280px;
  }
</style>

<script>
  import Vue from 'vue';
  import VueResource from 'vue-resource';
 
  Vue.use(VueResource);

  const apiUrl = 'https://kladr-api.ru/api.php',
        resultsLimit = 10
  import AutocompleteMenuItem from './autocomplete-menu--item.vue';

  export default {
    name: 'autocomplete-menu',
    components: { AutocompleteMenuItem },
    props: ['query', 'contentType', 'parentId'],
    data() {
      return {
        object: {},
        results: {},
        focusedItem: ''
      }
    },
    watch: {
      query(value) {
        
        if ( value !== '' ) {
          this.$emit('loadingStateChange', false);
            
          if ( this.contentType === 'city' ) {
            this.getCityByName(value).then( (response) => {
              this.results = response.body.result;
              this.$emit('loadingStateChange', true);
            });
          }

          if ( this.contentType === 'street' && typeof this.parentId !== 'undefined' ) {
            this.getStreetByCityId(value, this.parentId ).then( (response) => {
              this.results = response.body.result;
              this.$emit('loadingStateChange', true);
            });
          }

          if ( this.contentType === 'building' && typeof this.parentId !== 'undefined' ) {
            this.getBuildingByStreetId(value, this.parentId ).then( (response) => {
              this.results = response.body.result;
              this.$emit('loadingStateChange', true);
            });
          }
        }
      }
    },
    methods: {
      selectItem(object) {
        this.$emit('select', object);
      },
      queryDelay: (function() {
        let timer = 0;
        return function(callback) {
          clearTimeout(timer);
          timer = setTimeout(callback, 750);
        }
      })(),

      onFocus() {
        this.focusedItem = 0;
      },

      onKeyUp(event) {
        let resultsCount = this.results.length - 1;
        if ( event.keyCode === 38 && this.focusedItem > 0 ) {
            this.focusedItem -= 1;
        }
        if ( event.keyCode === 40 && this.focusedItem < resultsCount ) {
            this.focusedItem += 1;
        }
        if ( event.keyCode === 13 ) {
            this.selectItem(this.results[this.focusedItem]);
        }
        if ( event.keyCode === 27 ) {
          this.$emit('focusStateChange', false);
        }
      },

      getCityByName(name) {
        return this.$http.jsonp(apiUrl, {
          params: {
            contentType: 'city',
            typeCode: 7,
            withParent: 1,
            query: name,
            limit: resultsLimit
          }
        });
      },
      getStreetByCityId(name, cityId) {
        return this.$http.jsonp(apiUrl, {
          params: {
            contentType: 'street',
            withParent: 1,
            query: name,
            cityId: cityId,
            limit: resultsLimit
          }
        });
      },
      getBuildingByStreetId(name, streetId) {
        return this.$http.jsonp(apiUrl, {
          params: {
            contentType: 'building',
            withParent: 1,
            query: name,
            streetId: streetId,
            limit: resultsLimit
          }
        });
      }
    }
  }
</script>