<template>
  <div :class="$style.create_sale">
    <input type="text" v-model="newSale.created" :class="$style.create_sale__input">
    <input type="text" v-model="newSale.address" :class="$style.create_sale__input">
    <input type="number" v-model="newSale.rooms" :class="$style.create_sale__input">
    <input type="text" v-model="newSale.price" :class="$style.create_sale__input">
    <input type="text" v-model="newSale.communal_included" :class="$style.create_sale__input">
    <input type="text" v-model="newSale.commission" :class="$style.create_sale__input">
    <input type="text" v-model="newSale.partner" :class="$style.create_sale__input">
    <input type="text" v-model="newSale.emplyee" :class="$style.create_sale__input">
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
  export default {
    name: 'create-sale',
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