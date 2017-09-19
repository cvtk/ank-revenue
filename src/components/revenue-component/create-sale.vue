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
          <default-field label="Квартира"
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
            :isDone="newSale.employee"
            :needAttention="currentField === 'employee'"
          />
        </div>
        <div :class="$style.deal__type">
          <div :class="$style.type">
            <span :class="$style.type__label">Тип сделки:</span>
            <div :class="$style.type__controls">
              <default-radio v-model="newSale.type" small />
            </div>
          </div>
        </div>
        <div :class="$style.deal__partner" v-if="newSale.type.current === 'partner'">
          <default-field label="Контрагент"
            v-model="newSale.partner"
            type="text"
            :isDone="newSale.partner"
            :needAttention="currentField === 'partner'"
          />
        </div>
        <div :class="$style.deal__partner" v-if="newSale.type.current === 'employee'">
          <employee-field label="Коллега"
            v-model="newSale.partner"
            type="text"
            :isDone="newSale.partner"
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
    components: { AddrField, Datepicker, DefaultField, DefaultRadio, DefaultCheckbox, EmployeeField },
    props: ['sale'],
    data() {
      return {
        city: 'Ярославль', street: '', building: '',
        newSale: {
          type: {
            current: 'self',
            items: [
              { label: 'личная', title: 'Личная продажа - 100%', value: 'self', isActive: true },
              { label: 'коллега', title: 'Совместная с коллегой - 50/50%', value: 'employee', isActive: false },
              { label: 'партнер', title: 'Совместная с партнером - 50%', value: 'partner', isActive: false }
            ]
          },
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
          let sale = {};

          ['city', 'street', 'building'].forEach( field => {
            let obj = this.newSale[field],
                str = [ obj.typeShort, obj.name ].join('. ');
            sale[field] = str;
          });

          ['price', 'room', 'communal_included'].forEach( field => 
            sale[field] = this.newSale[field]
          );

          sale.created = parseInt((new Date(this.newSale.created).getTime() / 1000).toFixed(0));

          sale.employee = this.newSale.employee.name;
          sale.employeeId = this.newSale.employee.key;
          sale.group = this.newSale.employee.group;
          sale.groupId = this.newSale.employee.groupId;
          sale.type = this.newSale.type.current;
          sale.partner = this.newSale.partner.name;
          sale.partnerId = this.newSale.partner.key;
          sale.partnerGroup = this.newSale.partner.group;
          sale.partnerGroupId = this.newSale.partner.groupId;

          if ( sale.type === 'self' ) {
            sale.commission = this.newSale.commission;
          } else if ( sale.type === 'employee' ) {
              sale.commission = Math.round(this.newSale.commission / 2)
              let partnerSale = hlp._objClone(sale);
              partnerSale.employee = sale.partner;
              partnerSale.employeeId = sale.partnerId;
              partnerSale.group = sale.partnerGroup;
              partnerSale.groupId = sale.partnerGroupId;
              partnerSale.partner = sale.employee;
              partnerSale.partnerId = sale.employeeId;
              partnerSale.partnerGroup = sale.group;
              partnerSale.partnerGroupId = sale.groupId;
              fireface.revenue.save(partnerSale);
          } else if ( sale.type === 'partner' ) {
              sale.commission = Math.round(this.newSale.commission / 2);
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