<template>
  <div :class="$style.create_sale">
  <div :class="$style.create_sale__address_input">
    <div :class="$style.address_input">
      <div :class="$style.address_input__label_field">
        <label :class="$style.label_field">Адрес:</label>
      </div>
      <div :class="$style.address_input__city_field">
        <addr-field contentType="city" placeholder="Город" v-model="address.city" />
      </div>
      <div :class="$style.address_input__street_field">
        <addr-field contentType="street" placeholder="Улица" v-model="address.street"
          :parentId="address.city.id"
        />
      </div>
      <div :class="$style.address_input__building_field">
        <addr-field contentType="building" placeholder="Дом" v-model="address.building"
          :parentId="address.street.id"
        />
      </div>
      <div :class="$style.address_input__room_field">
        <default-field label="Квартира"
          v-model="address.room"
          type="number"
          min="1"
          max="999"
          :isDone="address.room"
          :needAttention="true"
        />
      </div>
    </div>
  </div>
  <div :class="$style.create_sale__deal_properties">
    <div :class="$style.deal_properties">
      <div :class="$style.deal_properties__label_field">
        <label :class="$style.label_field">Сделка:</label>
      </div>
      <div :class="$style.deal_properties__sale_price">
        <input type="number" :class="$style.default_field" 
          placeholder="Цена"
          v-model="newSale.price"
          />
      </div>
      <div :class="$style.deal_properties__sale_price">
        <input type="number" :class="$style.default_field"
          placeholder="Комиссия"
          v-model="newSale.commission"
          />
      </div>
      <div :class="$style.deal_properties__communal_included">
        <input :class="$style.default_field" />
      </div>
      <div :class="$style.deal_properties__sale_date">
        <default-field type="custom"
          :isDone="address.room"
          :needAttention="true">
          <datepicker :input-class="$style.default_field"
            placeholder="Дата продажи"
            language="ru" 
            v-model="newSale.created"
          />
        </default-field>
      </div>

    </div>
  </div>
  
  <div :class="$style.create_sale__deal_participants">
    <div :class="$style.deal_participants">
      <div :class="$style.deal_participants__employee_field"></div>
      <div :class="$style.deal_participants__partner_field"></div>
    </div>
  </div>
    

  </div>
</template>

<style lang="scss" module>
  @import "../../assets/styles/mixins.scss";
  .create_sale {
    border: 1px solid #c2cad8;
    .create_sale__address_input { /* */ }
    .create_sale__other_properties { /* */ }
  }

  .label_field {
    line-height: 30px;
    font-weight: 600;
  }

  .address_input {
    &:after { @include clearfix }
    padding: 10px;

    .address_input__label_field {
      float: left;
      width: 10%;
    }
    .address_input__city_field {
      float: left;
      width: 30%;
      padding-right: 10px;
    }
    .address_input__street_field {
      float: left;
      width: 30%;
      padding-right: 10px;
    }
    .address_input__building_field {
      float: left;
      width: 15%;
      padding-right: 10px;
    }
    .address_input__room_field {
      float: left;
      width: 15%;
    }
  }

  .deal_properties {
    &:after { @include clearfix }
    padding: 10px;
    .deal_properties__label_field {
      float: left;
      width: 10%;
    }
    .deal_properties__sale_price {
      float: left;
      width: 30%;
      padding-right: 10px;
    }
    .deal_properties__sale_commission {
      float: left;
      width: 30%;
      padding-right: 10px;
    }
    .deal_properties__communal_included {
      float: left;
      width: 15%;
      padding-right: 10px;
    }
    .deal_properties__sale_date {
      float: left;
      width: 15%;
    }

  }


</style>

<script>
  import firebase from '../../firebase.js';
  import Datepicker from 'vuejs-datepicker';
  import AddrField from '../address-field/address-field.vue';
  import DefaultField from '../default-field/default-field.vue';

  export default {
    name: 'create-sale',
    components: { AddrField, Datepicker, DefaultField },
    data() {
      return {
        address: { city: 'Ярославль', street: '', building: '', room: '' },
        newSale: {
          created: new Date(),
          modified: '',
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