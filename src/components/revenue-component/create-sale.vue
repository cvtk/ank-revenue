<template>
  <div :class="$style.create_sale">
    <div :class="$style.create_sale__address_input">
      <div :class="$style.address_input">
        <h2 :class="$style.params_header">Адрес объекта</h2>
        <div :class="$style.address_input__city_field">
          <addr-field contentType="city" label="Город" 
            v-model="city"
            :isDone="city === newSale.city.name"
            :needAttention="currentField === 'city'"
            @objectSelect="onObjectSelect"
          />
        </div>
        <div :class="$style.address_input__street_field">
          <addr-field contentType="street" label="Улица"
            v-model="street"
            :isDone="street === newSale.street.name"
            :needAttention="currentField === 'street'"
            @objectSelect="onObjectSelect"
            :parentId="newSale.city.id"
          />
        </div>
        <div :class="$style.address_input__building_field">
          <addr-field contentType="building" label="Дом"
            v-model="building"
            :isDone="building === newSale.building.name"
            :needAttention="currentField === 'building'"
            @objectSelect="onObjectSelect"
            :parentId="newSale.street.id"
          />
        </div>
        <div :class="$style.address_input__room_field">
          <default-field label="Квартира"
            v-model="newSale.room"
            type="number"
            min="1"
            max="999"
            :isDone="newSale.room"
            :needAttention="currentField === 'room'"
          />
        </div>
        <div :class="$style.address_input__sale_date">
          <default-field type="custom"
            label="Дата"
            :isDone="newSale.created !== ''"
            :needAttention="currentField === 'created'">
            <datepicker
              :input-class="$style.sale_date"
              :calendar-class="$style.sale_date__calendar"
              language="ru" 
              v-model="newSale.created"
              :monday-first="true"
            />
          </default-field>
        </div>
      </div>
    </div>
    <div :class="$style.create_sale__deal_properties">
      <div :class="$style.deal_properties">
        <h2 :class="$style.params_header">Параметры сделки</h2>
        <div :class="$style.deal_properties__employee_field">
          <default-field label="Сотрудник"
            v-model="newSale.employee"
            type="text"
            :isDone="newSale.employee"
            :needAttention="currentField === 'employee'"
          />
        </div>
        <div :class="$style.deal_properties__partner_field">
          <default-field label="Контрагент"
            v-model="newSale.partner"
            type="text"
            :isDone="newSale.partner"
            :needAttention="currentField === 'partner'"
          />
        </div>
        <div :class="$style.deal_properties__sale_price">
          <default-field label="Цена"
            v-model="newSale.price"
            type="number"
            min="0"
            :isDone="newSale.price"
            :needAttention="currentField === 'price'"
          />
        </div>
        <div :class="$style.deal_properties__sale_commission">
          <default-field label="Комиссия"
            v-model="newSale.commission"
            type="number"
            min="0"
            :isDone="newSale.commission"
            :needAttention="currentField === 'commission'"
          />
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
    <div :class="$style.create_sale__action_buttons">
      <span :class="[ $style.action_buttons, $style._remove ]" v-if="sale" tabindex="0" @click="onRemove">Удалить</span>
      <span :class="[ $style.action_buttons, currentField === 'complete' && $style._active ]" tabindex="0" @click="onSave">Сохранить</span>
    </div>
  </div>
</template>

<style lang="scss" module>
  @import "../../assets/styles/mixins.scss";

  .create_sale {

    &:after { @include clearfix }
    background-color: #fff;
    .create_sale__address_input {
      &:after { @include clearfix }
      float: left;
      width: 50%;
      margin-top: 15px;
      margin-bottom: 15px;
    }
    .create_sale__deal_properties {
      &:after { @include clearfix }
      float: left;
      width: 50%;
      margin-top: 15px;
      margin-bottom: 15px;
      border-left: 1px solid #c2cad8;
    }
    .create_sale__action_buttons {
      &:after { @include clearfix }
      position: relative;
      clear: both;
      margin: 20px;
    }

    @media (max-width: 600px) {
      .create_sale__address_input { width: 100%; margin-bottom: 0 }
      .create_sale__deal_properties { width: 100%; border: none }
    }
  }

  .params_header {
    font-size: 15px;
    color: #29b4b6;
    text-transform: uppercase;
    font-weight: 700;
    line-height: 18px;
    margin-top: -15px;
    margin-bottom: 15px;
  }

  .address_input {
    &:after { @include clearfix }
    padding: 20px;

    .address_input__city_field {
      float: left;
      width: 100%;
      margin-bottom: 10px;
    }
    .address_input__street_field {
      float: left;
      width: 100%;
      margin-bottom: 10px;
    }
    .address_input__building_field {
      float: left;
      width: 33.333333%;
      padding-right: 10px;
    }
    .address_input__room_field {
      float: left;
      width: 33.333333%;
      padding-right: 10px;
    }
    .address_input__sale_date {
      float: left;
      width: 33.333333%;
      .sale_date {
        border: none;
        width: 100%;
        cursor: pointer;
        font-size: 12px;
        font-family: "Arial", sans-serif;
        color: #777;
        padding-bottom: 3px;
        vertical-align: middle;
      }
      .sale_date__calendar {
        right: -1px;
        top: 24px;
        border: 1px solid #c2cad8;
      }
    }
  }

  .deal_properties {
    &:after { @include clearfix }
    padding: 20px;
    .deal_properties__employee_field {
      float: left;
      width: 100%;
      margin-bottom: 10px;
    }
    .deal_properties__partner_field {
      float: left;
      width: 100%;
      margin-bottom: 10px;
    }
    .deal_properties__sale_price {
      float: left;
      width: 50%;
      padding-right: 5px;
    }
    .deal_properties__sale_commission {
      float: left;
      width: 50%;
      padding-left: 5px;
    }
    .deal_properties__communal_included {
      float: left;
      width: 100%;
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
  }

  .action_buttons {
    display: block;
    float: right;
    color: #fff;
    background-color: #ee6052;
    font-weight: 600;
    touch-action: manipulation;
    cursor: pointer;
    border: 1px solid #ee6052;
    outline: none;
    white-space: nowrap;
    padding: 6px 12px;
    font-size: 14px;
    user-select: none;
    line-height: 20px;
    transition: border-color .25s, background-color .25s;
    &:hover {
      background-color: #e12330;
      border-color: #dc1e2b;
    }
    &._remove {
      float: left;
    }
    &._active {
      border: 1px solid #32c5d2;
      background-color: #32c5d2;
      &:hover {
        background-color: #26a1ab;
        border-color: #2499a3;
      }
    }
  }

</style>

<script>
  import fireface from '../../helpers/firebase-iface.js';
  import hlp from '../../helpers/helpers.js';
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
    props: ['sale'],
    data() {
      return {
        city: 'Ярославль', street: '', building: '',
        newSale: {
          created: new Date(),
          key: '',
          modified: '',
          price: '',
          communal_included: false,
          commission: '',
          partner: '',
          employee: '',
          city: defaultCity,
          street: {},
          building: {},
          room: ''
        }
      }
    },
    created() {
      if ( typeof this.sale !== 'undefined' ) {
        this.city = this.sale.city.name;
        this.street = this.sale.street.name;
        this.building = this.sale.building.name;
        this.sale.created = new Date(this.sale.created * 1000);
        this.newSale = this.sale;
      }
    },
    computed: {
      currentField() {
        if ( hlp._isEmptyObject(this.newSale.city) || this.city !== this.newSale.city.name ) return 'city';
        if ( hlp._isEmptyObject(this.newSale.street) || this.street !== this.newSale.street.name ) return 'street';
        if ( hlp._isEmptyObject(this.newSale.building) || this.building !== this.newSale.building.name ) return 'building';
        if ( this.newSale.room === '' ) return 'room';
        if ( this.newSale.created === '' ) return 'created';
        if ( this.newSale.employee === '' ) return 'employee';
        if ( this.newSale.partner === '' ) return 'partner';
        if ( this.newSale.price === '' ) return 'price';
        if ( this.newSale.commission === '' ) return 'commission';
        return 'complete';
      }
    },
    methods: {
      onRemove(event) {
        revenueRef.child(this.newSale.key).remove();
        this.$emit('save', true);
      },

      onSave(event) {
        if ( this.currentField === 'complete' ) {
          fireface.revenue.save(this.newSale)
            .then( ()=> this.$emit('save') )
        }
      },
      onObjectSelect(object) {
        if ( typeof object !== 'undefined' ) {
          this.$set(this.newSale, object.contentType, object)
          this[object.contentType] = object.name;
        }
      }
    }
  }
</script>