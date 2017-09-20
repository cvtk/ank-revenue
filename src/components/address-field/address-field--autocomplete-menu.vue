<template>
  <ul :class="$style.autocomplete_menu"
    @blur="onBlur">
    <li :class="$style.not_found" v-if="notFound">Ничего не найдено</li>
    <autocomplete-menu-item v-for="( item, index ) in results"
      :contentType="contentType"
      :item="item"
      :key="item.id"
      :isActive="focusedItem === index"
      @select="onSelect"
    />
  </ul>
</template>

<style lang="scss" module>
  .autocomplete_menu {
    list-style: none;
    outline: none;
    border: 1px solid #c2cad8;
    background-color: #fff;
    width: 100%;
    .not_found {
      padding: 5px 10px;
      color: #4E5966;
      font-size: 12px;
      font-weight: 300;
      cursor: pointer;
    }
  }
</style>

<script>
  import Vue from 'vue';
  import VueResource from 'vue-resource';
 
  Vue.use(VueResource);

  const apiUrl = 'https://kladr-api.ru/api.php',
        limit = 10
  import AutocompleteMenuItem from './autocomplete-menu--item.vue';

  export default {
    name: 'autocomplete-menu',
    components: { AutocompleteMenuItem },
    props: ['query', 'contentType', 'parentId', 'isDone'],
    data() {
      return {
        results: {},
        focusedItem: 0
      }
    },
    watch: {
      query(value) {
        if ( !this.isDone ) {
          this.focusedItem = 0;
          this.$emit('loadingStateChange', false);
          this.queryDelay( ()=> {

            let params = {
              contentType: this.contentType,
              query: this.query, 
              limit,
              withParent: 1
            }

            switch(this.contentType) {
              case 'city': params.typeCode = 7; break;
              case 'street': params.cityId = this.parentId; break;
              case 'building': params.streetId = this.parentId; break
            }

            this.$http.jsonp(apiUrl, { params }).then( (response)=> {
              this.results = response.body.result;
              this.$emit('loadingStateChange', true);
            })
          })
        }
      }
    },
    computed: {
      notFound() {
        return this.results.length === 0;
      }
    },
    methods: {
      onSelect(object) {
        this.focusedItem = 0;
        delete object['parents'];
        this.$emit('select', object);
      },
      queryDelay: (function() {
        let timer = 0;
        return function(callback) {
          clearTimeout(timer);
          timer = setTimeout(callback, 750);
        }
      })(),
      
      onBlur() { this.focusedItem = 0 },

      onKeyup(key) {
        let resultsCount = this.results.length - 1;
        if ( key === 'up' && this.focusedItem > 0 ) {
            this.focusedItem -= 1;
        }
        if ( key === 'down' && this.focusedItem < resultsCount ) {
            this.focusedItem += 1;
        }
        if ( key === 'enter' ) {
          this.onSelect(this.results[this.focusedItem]);
        }
      }
    }
  }
</script>