<template>
  <ul :class="$style.autocomplete_menu" v-if="results.length" tabindex="0" @keyup="onKeyUp">
    <li :class="[ $style.autocomplete_menu__item, item.id === object.id && $style._active ]"
      v-for="item in results"
      :key="item.id"
      @mouseover="object = item"
      @click = "selectItem"
    >
    {{ item.name }} (
    <span :class="$style._lighten">
      {{ item.type }}
    </span>
    <span :class="$style._lighten" v-for="parent in item.parents">
      , {{ parent.name }} {{ parent.typeShort }}
    </span>)
    </li>
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
      ._lighten{ font-size: 12px; font-weight: 300 }
    }
  }
</style>

<script>
  import Vue from 'vue';
  import VueResource from 'vue-resource';
 
  Vue.use(VueResource);

  const apiUrl = 'https://kladr-api.ru/api.php',
        resultsLimit = 5,
        defaultCity = {
          contentType: 'city',
          id: '7600000100000',
          name: 'Ярославль',
          okato: '78401000000',
          parents: [
            {
              contentType: 'region',
              id: '7600000000000',
              name: 'Ярославская',
              okato: '78000000000',
              type: 'Область',
              typeShort: 'обл',
              zip: 150029
            }
          ],
          type: 'Город',
          typeShort: 'г',
          zip: 150029
        }

  export default {
    name: 'autocomplete-menu',
    props: ['query', 'contentType', 'parentId'],
    data() {
      return {
        object: {},
        results: {}
      }
    },
    watch: {
      query(value) {
        if ( value !== '') {
          this.$emit('loadingStateChange', false);
          this.queryDelay( () => {
            if ( this.contentType === 'city' ) {
              this.getCityByName(value).then( (response) => {
                this.results = response.body.result;
                this.$emit('loadingStateChange', true);
              });
            }
          })
        }
      }
    },
    methods: {
      selectItem() {
        this.results = {};
        this.$emit('select', this.object);
      },
      queryDelay: (function() {
        let timer = 0;
        return function(callback) {
          clearTimeout(timer);
          timer = setTimeout(callback, 750);
        }
      })(),
      onKeyUp(event) {
        let currentIndex = this.results.indexOf(this.object),
            resultsCount = this.results.length;

        if ( event.keyCode === 38 && currentIndex > 0 ) {
            this.object = this.results[currentIndex - 1]
        }
        if ( event.keyCode === 40 && currentIndex < resultsCount - 1 ) {
            this.object = this.results[currentIndex + 1]
        }
        if ( event.keyCode === 13 ) {
            this.selectItem();
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
      }
    }
  }
</script>