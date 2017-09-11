<template>
  <div :class="$style.revenue_component">
    <div :class="$style.revenue_component__tool_bar">
      <div :class="$style.tool_bar">
        <div :class="$style.tool_bar__table_caption">
          <div :class="$style.table_caption">
            <span :class="$style.table_caption__icon"></span>
            <h2 :class="$style.table_caption__title">Продажи за период</h2>
          </div>
        </div>
        <div :class="$style.tool_bar__table_period">
          <div :class="$style.table_period">
            <span :class="[ $style.table_period__button, dateRange === 'quarter' && $style._active ]" @click="dateRange = 'quarter'">Квартал</span>
            <span :class="[ $style.table_period__button, dateRange === 'month' && $style._active ]" @click="dateRange = 'month'">Месяц</span>
            <span :class="[ $style.table_period__button, dateRange === 'week' && $style._active ]" @click="dateRange = 'week'">Неделя</span>
            <span :class="[ $style.table_period__button, dateRange === 'today' && $style._active ]" @click="dateRange = 'today'">Сегодня</span>
          </div>
        </div>
      </div>
    </div>

    <div :class="$style.revenue_component__create_sale" v-show="showSaleCreateForm">
      <create-sale />
    </div>
    
    <div :class="$style.revenue_component__list_actions">
      <div :class="$style.list_actions">
        <span :class="$style.list_actions__add_new" @click="showSaleCreateForm = !showSaleCreateForm">Добавить</span>
      </div>
    </div>

    <div :class="$style.revenue_component__items_list">
      <table :class="$style.items_list">
        <thead :class="$style.items_list__header">
          <tr :class="$style.items_list__row">
            <th :class="$style.items_list__column">Дата</th>
            <th :class="$style.items_list__column">Адрес</th>
            <th :class="$style.items_list__column">Цена аренды</th>
            <th :class="$style.items_list__column">Комиссия</th>
            <th :class="$style.items_list__column">Контрагент</th>
            <th :class="$style.items_list__column">Сотрудник</th>
          </tr>
        </thead>
        <tbody :class="$style.items_list__content">
          <sales-row v-for="sale in sales" :sale="sale" :key="sale.key" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" module>
  @import "../assets/styles/mixins.scss";
  .revenue_component {
    background-color: #fff;
    padding: 15px 20px;
    .revenue_component__tool_bar {
      &:after { @include clearfix }
      padding-bottom: 10px;
    }
    .revenue_component__create_sale {
      padding: 10px 0;
    }
    .revenue_component__list_actions {
      &:after { @include clearfix }
      padding: 10px 0;
    }
    .revenue_component__items_list {
      &:after { @include clearfix }
      padding: 10px 0;
    }
  }

  .tool_bar {
    &:after { @include clearfix }
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;

    .tool_bar__table_caption {
      &:after { @include clearfix }
      float: left;
      margin-top: 4px;
      margin-bottom: 4px
    }

    .tool_bar__table_period { float: right }
  }
  
  .table_caption {
    .table_caption__icon {
      display: block;
      float: left;
      background-image: url("../assets/icons/revenue.svg");
      background-repeat: no-repeat;
      background-size: 100%;
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
    .table_caption__title {
      display: block;
      float: left;
      font-size: 16px;
      text-transform: uppercase;
      font-weight: 700;
      line-height: 20px;
      color: #2f353b;
      letter-spacing: -0.5px;
      margin-top: 1px;
    }
  }
  
  .table_period  {
    &:after { @include clearfix }
    .table_period__button {
      display: block;
      float: right;
      padding: 4px 10px;
      font-size: 13px;
      line-height: 1.5;
      border: 1px solid #2f353b;
      cursor: pointer;
      color: #2f353b;
      background-color: #fff;
      border-radius: 25px;
      white-space: nowrap;
      user-select: none;
      margin-left: 10px;
      width: 75px;
      text-align: center;
      transition: border-color .5s, background-color .15s, color .15s;
      &:last-child { margin-left: 0 }
      &:hover, &._active {
        border-color: #2f353b;
        color: #fff;
        background-color: #2f353b;
      }
    }
  }

  .list_actions {
    &:after { @include clearfix }
    .list_actions__add_new {
      display: block;
      float: left;
      color: #FFF;
      background-color: #32c5d2;
      font-weight: 600;
      touch-action: manipulation;
      cursor: pointer;
      border: 1px solid #32c5d2;
      white-space: nowrap;
      padding: 6px 12px;
      font-size: 14px;
      user-select: none;
      line-height: 20px;
      transition: border-color .5s, background-color .15s;
      &:after {
        content: "";
        display: inline-block;
        background-image: url("../assets/icons/plus.svg");
        background-repeat: no-repeat;
        background-size: cover;
        width: 13px;
        height: 13px;
        vertical-align: middle;
        margin-left: 5px;
      }
      &:hover {
        background-color: #26a1ab;
        border-color: #2499a3;
      }
    }
  }

  .items_list {
    width: 100%;
    margin: 0;
    border-top: 1px solid #e7ecf1;
    border-bottom: 1px solid #e7ecf1;
    box-sizing: content-box;
    border-spacing: 0;
    .items_list__header .items_list__column {
      font-weight: 600;
      font-size: 14px;
      background-color: #e7ecf1;
    }
    .items_list__row:nth-child(even) { background-color: #eff3f8 }
    .items_list__column {
      &:first-child { border-left: 1px solid #e7ecf1 }
      border-right: 1px solid #e7ecf1;
      padding: 10px 5px;
      text-align: center;
      outline: 0;
      vertical-align: middle;
      font-weight: 300;
      font-size: 13px;
    }
  }

</style>

<script>
  import firebase from '../firebase.js';
  import hlp from '../helpers/helpers.js';
  import CreateSale from './revenue-component/create-sale.vue';
  import SalesRow from './revenue-component/sales-row.vue';

  const revenueRef = firebase.database().ref('revenue');

  export default {
    name: 'revenue',
    components: { CreateSale, SalesRow },
    data() {
      return {
        sales: {},
        dateRange: 'week',
        showSaleCreateForm: false
      }
    },
    watch: {
      dateRange(period) {
        this.onDateRangeChange();
      }
    },

    mounted() {
      this.onDateRangeChange();
    },

    methods: {
      endAt() {
        let dateObject = new Date();
        return hlp._dateToUnix(dateObject.setHours(24, 0, 0, 0));
      },

      startAt() {
        let dateObject = new Date(), startAt = '';

        switch ( this.dateRange ) {
          case 'week': startAt = new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate() - 7); break;
          case 'month': startAt = new Date(dateObject.getFullYear(), dateObject.getMonth() - 1, 1); break;
          case 'quarter': startAt = new Date(dateObject.getFullYear(), dateObject.getMonth() - 3, 1); break;
          default: startAt = dateObject.setHours(0, 0, 0, 0); break;
        }
        return hlp._dateToUnix(startAt);
      },

      onDateRangeChange() {
        let ref = revenueRef.orderByChild('created').startAt(this.startAt()).endAt(this.endAt());
        ref.off( 'value', this.firebaseValueCallback );
        ref.on( 'value', this.firebaseValueCallback );
      },
      firebaseValueCallback(sales) {
        this.sales = sales.val();
      }
    }
  }
</script>