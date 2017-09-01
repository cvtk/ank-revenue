<template>
  <div :class="$style.address_field">
    <label for=""></label>
    <input type="text" :class="$style.address_field__input" placeholder="Город" v-model="city.name" @keyup="cityAutocomplete()">
    <input type="text" :class="$style.address_field__input" placeholder="Улица">
    <input type="text" :class="$style.address_field__input" placeholder="Дом">
    <div :class="$style.address_field__autocomplete_menu">
      <ul :class="$style.autocomplete_menu">
        <li :class="$style.autocomplete_menu__item" v-for="item in autocomplete">
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
    .autocomplete_menu__item {
      display: block;
      border: none;
      color: #4E5966;
      padding: 5px 10px;
      font-size: 12px;
      line-height: 1.5;
      height: 30px;
      cursor: pointer;
      &:hover { background-color: #e7ecf1 }
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
    data() {
      return {
        city: { name: 'Ярославль' },
        autocomplete: {}
      }
    },
    methods: {
      getCityByName(name, type) {
        let typeCode = type;
        ( typeof typeCode === 'undefined' ) && ( typeCode = 7 );

        return this.$http.jsonp(apiUrl, {
          params: {
            contentType: 'city',
            typeCode: typeCode,
            withParent: 1,
            query: name
          }
        });
      },
      cityAutocomplete() {
        this.getCityByName(this.city.name).then( (response) => {
          let result = response.body.result;
          if ( result.length !== 0 ) {
            console.log(result)
            this.autocomplete = result;
          }
        })
      }
    },
    created() {
      this.getCityByName('Ярославль', 1).then( (response) => {
        let result = response.body.result;
        if ( result.length !== 0 ) {
          this.city = result[0];
        }
      })
    }
  }
</script>