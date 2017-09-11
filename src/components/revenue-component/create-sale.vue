<template>
  <div :class="$style.create_sale">
  <div :class="$style.create_sale__address_input">
    <div :class="$style.address_input">
      <div :class="$style.address_input__label_field">
        <label :class="$style.label_field">Адрес:</label>
      </div>
      <div :class="$style.address_input__city_field">
        <addr-field contentType="city" label="Город" 
          v-model="city"
          :isDone="city === address.city.name"
          @objectSelect="onObjectSelect"
        />
      </div>
      <div :class="$style.address_input__street_field">
        <addr-field contentType="street" label="Улица"
          v-model="street"
          :isDone="street === address.street.name"
          @objectSelect="onObjectSelect"
          :parentId="address.city.id"
        />
      </div>
      <div :class="$style.address_input__building_field">
        <addr-field contentType="building" label="Дом"
          v-model="building"
          :isDone="building === address.building.name"
          @objectSelect="onObjectSelect"
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
          :needAttention="false"
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
        <default-field label="Цена"
          v-model="newSale.price"
          type="number"
          min="0"
          :isDone="newSale.price"
          :needAttention="false"
        />
      </div>
      <div :class="$style.deal_properties__sale_commission">
        <default-field label="Комиссия"
          v-model="newSale.commission"
          type="number"
          min="0"
          :isDone="newSale.commission"
          :needAttention="false"
        />
      </div>
      <div :class="$style.deal_properties__sale_date">
        <default-field type="custom"
          label="Дата продажи"
          :isDone="newSale.created !== ''"
          :needAttention="true">
          <datepicker
            :input-class="$style.sale_date"
            :calendar-class="$style.sale_date__calendar"
            language="ru" 
            v-model="newSale.created"
          />
        </default-field>
      </div>
      <div :class="$style.deal_properties__communal_included">
        <div :class="$style.communal_included">
          <input :class="$style.communal_included__input" v-model="newSale.communal_included" id="dF5BHgkQ" type="checkbox" />
          <label :class="$style.communal_included__label" for="dF5BHgkQ">
            <span :class="$style.communal_included__inc"></span>
            <span :class="$style.communal_included__check"></span>
            <span :class="$style.communal_included__box"></span>
            коммунальные включены
          </label>
        </div>
      </div>
    </div>
  </div>
  
  <div :class="$style.create_sale__deal_participants">
    <div :class="$style.deal_participants">
      <div :class="$style.deal_participants__label_field">
        <label :class="$style.label_field">Адрес:</label>
      </div>

      <div :class="$style.deal_participants__employee_field">
        <default-field label="Сотрудник"
          v-model="newSale.employee"
          type="text"
          :isDone="newSale.employee"
          :needAttention="false"
        />
      </div>
      <div :class="$style.deal_participants__partner_field">
        <default-field label="Контрагент"
          v-model="newSale.partner"
          type="text"
          :isDone="newSale.partner"
          :needAttention="false"
        />
      </div>
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
      width: 20%;
      padding-right: 10px;
    }
    .deal_properties__sale_commission {
      float: left;
      width: 20%;
      padding-right: 10px;
    }
    .deal_properties__communal_included {
      float: left;
      width: 30%;
      padding-right: 10px;
      .communal_included {
        position: relative;
        padding-top: 15px;
        .communal_included__input:checked ~ label > .communal_included__check {
          opacity: 1;
          -webkit-transform: scale(1) rotate(45deg);
          -moz-transform: scale(1) rotate(45deg);
          transform: scale(1) rotate(45deg);
        }
        .communal_included__input:checked ~ label > .communal_included__box {
          display: none;
        }
        .communal_included__input {
          visibility: hidden;
          position: absolute;
        }
        .communal_included__label {
          position: relative;
          cursor: pointer;
          padding-left: 30px;
          font-size: 13px;
        }
        .communal_included__inc {

        }
        .communal_included__check {
          display: block;
          position: absolute;
          top: -4px;
          left: 6px;
          width: 10px;
          height: 20px;
          border: 2px solid #36c6d3;
          border-top: none;
          border-left: none;
          opacity: 0;
          z-index: 5;
          -webkit-transform: rotate(180deg);
          -moz-transform: rotate(180deg);
          transform: rotate(180deg);
        }
        .communal_included__box {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          border: 2px solid #666;
          height: 20px;
          width: 20px;
          z-index: 5;
        }
      }
    }
    .deal_properties__sale_date {
      float: left;
      width: 20%;
      padding-right: 10px;
      .sale_date {
        border: none;
        width: 100%;
        cursor: pointer;
        font-size: 12px;
        font-family: "Arial", sans-serif;
        color: #777;
      }
      .sale_date__calendar {
        right: -1px;
        top: 24px;
        border: 1px solid #c2cad8;
      }
    }
  }

  .deal_participants {
    &:after { @include clearfix }
    padding: 10px;
    .deal_participants__label_field {
      float: left;
      width: 10%;
      padding-right: 10px;
    }
    .deal_participants__employee_field {
      float: left;
      width: 30%;
      padding-right: 10px;
    }
    .deal_participants__partner_field {
      float: left;
      width: 30%;
      padding-right: 10px;
    }
  }


</style>

<script>
  import firebase from '../../firebase.js';
  import Datepicker from 'vuejs-datepicker';
  import AddrField from '../address-field/address-field.vue';
  import DefaultField from '../default-field/default-field.vue';

   const defaultCity = {
    contentType: 'city',
    id: '7600000100000',
    name: 'Ярославль',
    okato: '78401000000',
    parents: [{
      contentType: 'region',
      id: '7600000000000',
      name: 'Ярославская',
      okato: '78000000000',
      type: 'Область',
      typeShort: 'обл',
      zip: 150029
    }],
    type: 'Город',
    typeShort: 'г',
    zip: 150029
    }

  export default {
    name: 'create-sale',
    components: { AddrField, Datepicker, DefaultField },
    data() {
      return {
        city: 'Ярославль', street: '', building: '',
        address: { city: defaultCity, street: {}, building: {}, room: '' },
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
    },
    methods: {
      onObjectSelect(object) {
        if ( typeof object !== 'undefined' ) {
          this.$set(this.address, object.contentType, object)
          this[object.contentType] = object.name;
        }
      }
    }
  }
</script>