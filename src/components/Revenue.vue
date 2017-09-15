<template>
  <div :class="$style.revenue_component">
    <modal-overlay :show="showModal" @close="onModalClose">
      <create-sale @save="onSave" :sale="editingSale" />
    </modal-overlay>
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
            <span title="За все время" 
              :class="[ $style.table_period__button, startAt === 'all' && $style._active ]" 
              @click="startAt = 'all'">Все
            </span>
            <span title="В текущем квартале" 
              :class="[ $style.table_period__button, startAt === 'quarter' && $style._active ]" 
              @click="startAt = 'quarter'">Квартал
            </span>
            <span title="В этом месяце"
              :class="[ $style.table_period__button, startAt === 'month' && $style._active ]"
              @click="startAt = 'month'">Месяц
            </span>
            <span title="На этой неделе"
              :class="[ $style.table_period__button, startAt === 'week' && $style._active ]"
              @click="startAt = 'week'">Неделя
            </span>
            <span title="Сегодня"
              :class="[ $style.table_period__button, startAt === 'today' && $style._active ]"
              @click="startAt = 'today'">Сегодня
            </span>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade" appear>
      <div :class="$style.revenue_component__create_sale" v-if="showSaleCreateForm">
        <create-sale @save="onSave"></create-sale>
      </div>
    </transition>
    
    <div :class="$style.revenue_component__list_actions">
      <div :class="$style.list_actions">
        <span :class="$style.list_actions__add_new" @click="showSaleCreateForm = !showSaleCreateForm">Добавить</span>
      </div>
    </div>
    <div><span @click="prevPage"> << </span>    <span @click="nextPage"> >> </span> </div>
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
        <transition name="fade" appear>
          <tbody :class="$style.items_list__content">
              <sales-row v-for="sale in salesByTimestamp" :sale="sale" :key="sale.key" @select="onSelect" />
          </tbody>
        </transition>
      </table>
    </div>
  </div>
</template>
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .35s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
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
      position: relative;
      margin: 10px 0;
      border: 1px solid #c2cad8;
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
    box-sizing: content-box;
    border-spacing: 0;
    .items_list__content { transition: opacity .3s }
    .items_list__row { /* */ }
    .items_list__column {
      &:first-child { border-left: 1px solid #e7ecf1 }
      font-weight: 600;
      font-size: 14px;
      background-color: #eff3f8;
      border-right: 1px solid #e7ecf1;
      border-bottom: 1px solid #aaa;
      padding: 10px 5px;
      text-align: center;
      vertical-align: middle;
    }
  }

</style>

<script>
  import fireface from '../helpers/firebase-iface.js';
  import hlp from '../helpers/helpers.js';
  import CreateSale from './revenue-component/create-sale.vue';
  import SalesRow from './revenue-component/sales-row.vue';
  import ModalOverlay from './modal-overlay/modal-overlay.vue';

  export default {
    name: 'revenue',
    components: { CreateSale, SalesRow, ModalOverlay },
    data() {
      return {
        editingSale: {},
        sales: {},
        startAt: 'week',
        endAt: new Date,
        showSaleCreateForm: false,
        showModal: false,
        currentRef: ''
      }
    },
    watch: {
      startAt(value) {
        this.onDateRangeChange();
      },
      endAt(value) {
        this.onDateRangeChange();
      }
    },

    mounted() {
      this.onDateRangeChange();
    },

    computed: {
      salesByTimestamp: function() {
        if ( hlp._isEmptyObject(this.sales) || !this.sales ) return false
        else {
          let arr = Object.keys(this.sales).map(key => this.sales[key] );
          return arr.sort((x, y) => y.created - x.created);
        }
      }
    },
    methods: {
      nextPage() {
        let arr = hlp._objToArr(this.sales),
            endAt = Math.min.apply(Math, arr.map( (obj) => obj.created ));
        console.log(endAt);
        this.endAt = endAt;
      },

      prevPage() {
        let arr = hlp._objToArr(this.sales),
            endAt = Math.max.apply(Math, arr.map( (obj) => obj.created ));
        console.log(endAt);
        this.endAt = endAt;
      },

      onSelect(object) {
        this.editingSale = JSON.parse( JSON.stringify(object) );
        this.showModal = true;
      },

      onModalClose(event) {
        this.showModal = false;
      },

      onSave(result) {
        this.showSaleCreateForm = false;
        this.showModal = false;
      },

      onDateRangeChange() {
        let range = { startAt: this.startAt, endAt: this.endAt };
        if ( this.currentRef ) {
          this.currentRef.off( 'value', this.firebaseValueCallback );
        }
        this.currentRef = fireface.revenue.byCreated( range, 10 );
        this.currentRef.on( 'value', this.firebaseValueCallback );
      },

      firebaseValueCallback(sales) {
        this.sales = sales.val();
      }
    }
  }
</script>