<template>
  <div :class="$style.create_sale">
    <sale-address-field type="city" />
  </div>
</template>

<style lang="scss" module>
  @import "../../assets/styles/mixins.scss";
  .create_sale {
    .create_sale__input {
      outline: none;
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
  import firebase from '../../firebase.js';
  import SaleAddressField from './create-sale--address-field.vue';

  const streetsRef = firebase.database().ref('streets');

  export default {
    name: 'create-sale',
    components: { SaleAddressField },
    data() {
      return {
        newSale: {
          created: '',
          address: '',
          rooms: '',
          price: '',
          communal_included: '',
          commission: '',
          partner: '',
          employee: ''
        }
      }
    }
  }
</script>