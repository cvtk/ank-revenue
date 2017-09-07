<template>
  <div :class="$style.create_sale">

    <addr-field contentType="city" placeholder="Город" v-model="address.city" />
    <addr-field contentType="street" placeholder="Улица" v-model="address.street"
      :parentId="address.city.id"
      :enabled="address.city.id" 
    />
    <addr-field contentType="building" placeholder="Дом" v-model="address.building"
      :parentId="address.street.id"
      :enabled="address.street.id"
    />

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
  import AddrField from '../address-field/address-field.vue';

  const streetsRef = firebase.database().ref('streets');

  export default {
    name: 'create-sale',
    components: { AddrField },
    data() {
      return {
        address: { city: 'Ярославль', street: '', building: '' },
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