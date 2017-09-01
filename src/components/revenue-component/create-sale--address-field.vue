<template>
  <div :class="$style.address_field">
    <label for=""></label>
    <input type="text" :class="$style.address_field__input" v-model="city.name" placeholder="Город">
    <input type="text" :class="$style.address_field__input" placeholder="Улица">
    <input type="text" :class="$style.address_field__input" placeholder="Дом">
  </div>
</template>

<style lang="scss" module>
  .address_field {
    display: inline-block;
    padding: 10px;
    border: 1px solid #c2cad8;
    font-size: 0;
    .address_field__input {
      display: inline-block;
      outline: none;
      margin-left: -1px;
      height: 30px;
      padding: 5px 10px;
      font-size: 12px;
      line-height: 1.5;
      background-color: #fff;
      border: 1px solid #c2cad8;
      transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
      color: #555;
    }
  }
</style>

<script>
  import Vue from 'vue';
  import axios from 'axios';
  import VueAxios from 'vue-axios';
 
  Vue.use(VueAxios, axios);

  const apiUrl = 'https://kladr-api.ru/api.php';
  const defaultCityId = '7600000100000'; // Ярославль

  export default {
    name: 'address-field',
    props: [ 'address' ],
    data() {
      return {
        city: {
          id: '7600000100000',
          name: 'Ярославль',
          zip: '150029',
          type: 'Город',
          typeShort: 'г',
          okato: '78401000000',
          contentType: 'city'
        }
      }
    },
    computed: {
      currentField() {

      }
    },
    created() {
      this.axios.get(apiUrl, {
        params: {
          contentType: 'city',
          cityId: defaultCityId
        }
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      })
    }
  }
</script>