<template>
  <div :class="$style.create">
    <div :class="$style.create__address">
      <div :class="$style.address">
        <h2 :class="$style.header">Адрес объекта</h2>
        <div :class="$style.address__city">
          <addr-field contentType="city" label="Город" 
            v-model="city"
            :isDone="city === newSale.city.name"
            :needAttention="currentField === 'city'"
            @objectSelect="onObjectSelect"
          />
        </div>
        <div :class="$style.address__street">
          <addr-field contentType="street" label="Улица"
            v-model="street"
            :isDone="street === newSale.street.name"
            :needAttention="currentField === 'street'"
            @objectSelect="onObjectSelect"
            :parentId="newSale.city.id"
          />
        </div>
        <div :class="$style.address__building">
          <addr-field contentType="building" label="Дом"
            v-model="building"
            :isDone="building === newSale.building.name"
            :needAttention="currentField === 'building'"
            @objectSelect="onObjectSelect"
            :parentId="newSale.street.id"
          />
        </div>
        <div :class="$style.address__room">
          <default-field label="Комнат"
            v-model="newSale.room"
            type="number"
            min="1"
            max="999"
            :isDone="newSale.room"
            :needAttention="currentField === 'room'"
          />
        </div>
        <div :class="$style.address__date">
          <default-field type="custom"
            label="Дата"
            :isDone="newSale.created !== ''"
            :needAttention="currentField === 'created'">
            <datepicker
              :input-class="$style.date"
              :calendar-class="$style.date__calendar"
              language="ru" 
              v-model="newSale.created"
              :monday-first="true"
            />
          </default-field>
        </div>
      </div>
    </div>
    <div :class="$style.create__deal">
      <div :class="$style.deal">
        <h2 :class="$style.header">Параметры сделки</h2>
        <div :class="$style.deal__employee">
          <employee-field label="Сотрудник"
            v-model="newSale.employee"
            type="text"
            :isDone="newSale.employee.name"
            :needAttention="currentField === 'employee'"
          />
        </div>
        <div :class="$style.deal__type">
          <div :class="$style.type">
            <span :class="$style.type__label">Тип сделки:</span>
            <div :class="$style.type__controls">
              <default-radio :value="type" small @input="onTypeChange"/>
            </div>
          </div>
        </div>
        <div :class="$style.deal__partner" v-if="newSale.type === 'partner'">
          <default-field label="Контрагент"
            v-model="newSale.partner.name"
            type="text"
            :isDone="!!newSale.partner.name"
            :needAttention="currentField === 'partner'"
          />
        </div>
        <div :class="$style.deal__partner" v-if="newSale.type === 'employee'">
          <employee-field label="Коллега"
            v-model="newSale.partner"
            type="text"
            :isDone="!!newSale.partner.name"
            :needAttention="currentField === 'partner'"
          />
        </div>
        <div :class="$style.deal__price">
          <default-field label="Цена"
            v-model="newSale.price"
            type="number"
            min="0"
            :isDone="newSale.price"
            :needAttention="currentField === 'price'"
          />
        </div>
        <div :class="$style.deal__commission">
          <default-field label="Комиссия"
            v-model="newSale.commission"
            type="number"
            min="0"
            :isDone="newSale.commission"
            :needAttention="currentField === 'commission'"
          />
        </div>
        <div :class="$style.deal__communal">
          <default-checkbox v-model="newSale.communal_included" label="коммунальные включены" />
        </div>
      </div>
    </div>
    <div :class="$style.create__actions">
      <span :class="[ $style.action_buttons, $style._remove ]" v-if="sale" tabindex="0" @click="onRemove">Удалить</span>
      <span :class="[ $style.action_buttons, currentField === 'complete' && $style._active ]" tabindex="0" @click="onSave">Сохранить</span>
    </div>
  </div>
</template>

<style lang="scss" module>
  @import "../../assets/styles/mixins.scss";

  .create {

    &:after { @include clearfix }
    background-color: #fff;
    .create__address {
      &:after { @include clearfix }
      float: left;
      width: 50%;
      margin-top: 15px;
      margin-bottom: 15px;
    }
    .create__deal {
      &:after { @include clearfix }
      float: left;
      width: 50%;
      margin-top: 15px;
      margin-bottom: 15px;
      border-left: 1px solid #c2cad8;
    }
    .create__actions {
      &:after { @include clearfix }
      position: relative;
      clear: both;
      margin: 20px;
    }

    @media (max-width: 600px) {
      .create__address { width: 100%; margin-bottom: 0 }
      .create__deal { width: 100%; border: none }
    }
  }

  .header {
    font-size: 15px;
    color: #29b4b6;
    text-transform: uppercase;
    font-weight: 700;
    line-height: 18px;
    margin-top: -15px;
    margin-bottom: 15px;
  }

  .address {
    &:after { @include clearfix }
    padding: 20px;

    .address__city {
      float: left;
      width: 100%;
      margin-bottom: 10px;
    }
    .address__street {
      float: left;
      width: 100%;
      margin-bottom: 10px;
    }
    .address__building {
      float: left;
      width: 33.333333%;
      padding-right: 10px;
    }
    .address__room {
      float: left;
      width: 33.333333%;
      padding-right: 10px;
    }
    .address__date {
      float: left;
      width: 33.333333%;
      .date {
        border: none;
        width: 100%;
        cursor: pointer;
        font-size: 12px;
        font-family: "Arial", sans-serif;
        color: #777;
        padding-bottom: 3px;
        vertical-align: middle;
      }
      .date__calendar {
        right: -1px;
        top: 24px;
        border: 1px solid #c2cad8;
      }
    }
  }

  .deal {
    &:after { @include clearfix }
    padding: 20px;
    .deal__employee {
      float: left;
      width: 100%;
      margin-bottom: 10px;
    }
    .deal__type {
      float: left;
      width: 100%;
      margin-top: 15px;
      margin-bottom: 15px;
    }
    .deal__partner {
      float: left;
      width: 100%;
      margin-bottom: 10px;
    }
    .deal__price {
      float: left;
      width: 50%;
      padding-right: 5px;
      margin-bottom: 15px;
    }
    .deal__commission {
      float: left;
      width: 50%;
      padding-left: 5px;
      margin-bottom: 15px;
    }
    .deal__communal {
      float: left;
      width: 100%;
    }
  }

  .type {
    &:after { @include clearfix }
    position: relative;
  }

  .type__label {
    display: block;
    float: left;
    color: #94A0B2;
    padding: 1px 0;
  }

  .type__controls {
    float: right;
    text-align: right;
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
  import EmployeeField from '../employee-field/employee-field.vue';
  import DefaultField from '../default-field/default-field.vue';
  import DefaultRadio from '../default-radio/default-radio.vue';
  import DefaultCheckbox from '../default-checkbox/default-checkbox.vue';

  const defaultCity = {
    contentType: 'city',
    id: '7600000100000',
    name: 'Ярославль',
    okato: '78401000000',
    type: 'Город',
    typeShort: 'г',
    zip: 150029
    }

  export default {
    name: 'create-sale',
    components: { AddrField, Datepicker, DefaultField, DefaultRadio, DefaultCheckbox, EmployeeField },
    props: ['sale'],
    data() {
      return {
        city: 'Ярославль', street: '', building: '',
        type: {
          current: '',
          items: [
            { label: 'личная', title: 'Личная продажа - 100%', value: 'self', isActive: false },
            { label: 'коллега', title: 'Совместная с коллегой - 50/50%', value: 'employee', isActive: false },
            { label: 'партнер', title: 'Совместная с партнером - 50%', value: 'partner', isActive: false }
          ]
        },
        newSale: {
          type: '',
          created: new Date(),
          key: '',
          price: '',
          communal_included: false,
          commission: '',
          partner: { name: '' },
          employee: { name: '' },
          city: defaultCity,
          street: {},
          building: {},
          room: ''
        }
      }
    },
    created() {
      if ( typeof this.sale !== 'undefined' ) {
        this.type.current = this.sale.type;
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
        if ( this.newSale.employee.name === '' ) return 'employee';
        if ( !this.newSale.type ) return 'type';
        if ( this.newSale.type !== 'self' && this.newSale.partner.name === '' ) return 'partner';
        if ( this.newSale.price === '' ) return 'price';
        if ( this.newSale.commission === '' ) return 'commission';
        return 'complete';
      }
    },
    methods: {
      onTypeChange(obj) {
        this.newSale.partner.name = '';
        this.newSale.type = obj.current;

      },
      onRemove(event) {
        fireface.revenue.remove(this.newSale.key)
          .then( () => console.log('Remove item'))
          .catch( error => console.log( error ))

        this.$emit('save', true);
      },

      onSave(event) {
        if ( this.currentField === 'complete' ) {
          let sale = Object.assign( {}, this.newSale );
          sale.created = hlp._dateToUnix(sale.created);
          sale.commission = ( sale.type !== 'self' && !sale.key ) ? Math.round(sale.commission / 2) : sale.commission;

          if ( sale.type === 'employee' && !sale.key ) {
              let colleagueSale = Object.assign( {}, sale );
              colleagueSale.partner = Object.assign( {}, sale.employee );
              colleagueSale.employee = Object.assign( {}, sale.partner );
              fireface.revenue.save(colleagueSale);
          }
          
          fireface.revenue.save(sale)
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