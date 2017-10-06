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
          <default-radio :value="startAtRange" @input="onSelectRange" />
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
        <div :class="$style.list_actions__sales_search">
          <div :class="$style.sales_search">
            <input :class="$style.sales_search__input" type="text" placeholder="Поиск..." v-model="sortSearch">
            <span :class="$style.sales_search__button" title="Поиск"></span>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.revenue_component__pagination_nav">
      <default-pagination v-model="pages" /> 
    </div>
    <div :class="$style.revenue_component__items_list">
      <table :class="$style.items_list">
        <thead :class="$style.items_list__header">
          <tr :class="$style.items_list__row">
            <th :class="[ $style.items_list__column, sortType === 'created' && $style._active ]"
              @click="onChangeSortField('created')">Дата</th>

            <th :class="[ $style.items_list__column, sortType === 'street' && $style._active ]"
              @click="onChangeSortField('street')">Адрес</th>

            <th :class="[ $style.items_list__column, sortType === 'price' && $style._active ]"
              @click="onChangeSortField('price')">Цена аренды</th>

            <th :class="[ $style.items_list__column, sortType === 'commission' && $style._active ]"
              @click="onChangeSortField('commission')">Комиссия</th>

            <th :class="[ $style.items_list__column, sortType === 'type' && $style._active ]"
              @click="onChangeSortField('type')">Тип сделки</th>

            <th :class="[ $style.items_list__column, sortType === 'partner' && $style._active ]"
              @click="onChangeSortField('partner')">Контрагент</th>

            <th :class="[ $style.items_list__column, sortType === 'employee' && $style._active ]"
              @click="onChangeSortField('employee')">Сотрудник</th>

            <th :class="[ $style.items_list__column, sortType === 'group' && $style._active ]"
              @click="onChangeSortField('group')">Группа</th>
          </tr>
        </thead>
        <transition name="fade" appear>
          <tbody :class="$style.items_list__content">
            <sales-row v-for="sale in paginatedItems" :sale="sale" :key="sale.key" @select="onSelect" />
          </tbody>
        </transition>
      </table>
      <default-loader v-if="dataLoading" />
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

    .revenue_component__pagination_nav {
      position: relative;
      text-align: right;
    }

    .revenue_component__items_list {
      &:after { @include clearfix }
      position: relative;
      padding: 10px 0;
      min-height: 450px;
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

    .tool_bar__table_period { float: right; margin: 2px 0 }
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
    .list_actions__sales_search {
      float: right;
    }
  }

  .sales_search {
    position: relative;
    .sales_search__input {
      border: 1px solid #94A0B2;
      color: #94A0B2;
      background-color: #fff;
      font-size: 13px;
      width: 176px;
      font-weight: 300;
      height: 34px;
      padding: 6px 12px;
      padding-right: 34px;
      outline: none;
      transition: width .4s;
      &:focus { width: 280px }
    }
    .sales_search__button {
      position: absolute;
      right: 8.5px;
      top: 8.5px;
      width: 17px;
      height: 17px;
      background-image: url("../assets/icons/search.svg");
      background-repeat: no-repeat;
      background-size: 100%;
      cursor: pointer;
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
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;
      background-color: #eff3f8;
      border-right: 1px solid #e7ecf1;
      border-bottom: 1px solid #aaa;
      padding: 10px 5px;
      text-align: center;
      vertical-align: middle;
      user-select: none;
      &:hover, &._active { color: #5C9BD1 }
    }
  }

</style>

<script>
  import fireface from '../helpers/firebase-iface.js';
  import h from '../helpers/helpers.js';
  import CreateSale from './revenue-component/create-sale.vue';
  import SalesRow from './revenue-component/sales-row.vue';
  import ModalOverlay from './modal-overlay/modal-overlay.vue';
  import DefaultRadio from './default-radio/default-radio.vue';
  import DefaultLoader from './default-loader/default-loader.vue';
  import DefaultPagination from './default-pagination/default-pagination.vue';

  export default {
    name: 'revenue',

    components: { CreateSale, SalesRow, ModalOverlay, DefaultRadio, DefaultLoader, DefaultPagination },

    data() {
      return {
        pages: { current: 1, itemsPerPage: 20, itemsCount: 10 },
        dataLoading: false,
        sortSearch: '',
        sortType: 'created',
        sortDesc: false,
        editingSale: {},
        sales: {},
        showSaleCreateForm: false,
        showModal: false,
        currentRef: '',
        startAtRange: {
          current: 'month',
          items: [
            { label: 'Неделя', title: 'На этой неделе', value: 'week', isActive: false },
            { label: 'Месяц', title: 'За текущий месяц', value: 'month', isActive: true },
            { label: 'Квартал', title: 'В этом квартале', value: 'quarter', isActive: false },
            { label: 'Год', title: 'В текущем году', value: 'year', isActive: false },
            { label: 'Все', title: 'За все время', value: 'all', isActive: false }
          ]
        }
      }
    },

    mounted() {
      this.dateRangeChange('week', new Date);
    },

    computed: {
      paginatedItems() {
        let salesCount = this.filteredItems.length;
        if ( salesCount ) {
          this.pages.itemsCount = salesCount;
          let startAt = (this.pages.current - 1) * this.pages.itemsPerPage,
              endAt = this.pages.current * this.pages.itemsPerPage
          return this.filteredItems.slice(startAt, endAt);
        }
      },

      filteredItems() {
        if ( h._isEmptyObject(this.sales) || !this.sales ) return []
        else {
          let arr = h._objToArr(this.sales),
              results = [];

          if ( this.sortSearch.trim() ) {
            let searchStr = this.sortSearch.toLowerCase();
            arr.forEach( sale => {
              let notRecurrence = true;
              [ 'employee', 'partner', 'street' ].forEach( field => {
                if ( !!sale[field].name ) {
                  let current = sale[field].name.toLowerCase();
                  if ( current.indexOf(searchStr) !== -1 && notRecurrence) {
                    results.push(sale);
                    notRecurrence = false;
                  }
                }
              })
            })
            arr = results;
          }
          return arr.sort((fElement, sElement) => {
            // TODO переписать эту содомию
            let st = this.sortType, a, b = '';
            if ( st === 'street' || st === 'employee' || st === 'partner' ) {
              a = fElement[st].name; b = sElement[st].name;
            } else if ( st === 'group' ) {
              a = fElement.employee[st]; b = sElement.employee[st];
            }
            else {
              a = fElement[st]; b = sElement[st];
            }
            if ( this.sortDesc ) {
              if ( a > b ) return 1;
              if ( a < b ) return -1;
            } else {
              if ( a < b ) return 1;
              if ( a > b ) return -1;
            }
          });

        }
      }
    },
    methods: {
      onPageSelect(page) {
        if ( page.current === '<' ) {

        } else if (  page.current === '>' ) {

        } else {
          
        }
      },

      onChangeSortField(field) {
        if ( this.sortType === field ) {
          this.sortDesc = !this.sortDesc;
        } else {
          this.sortDesc = false;
          this.sortType = field;
        }
        
      },
      onSelectRange(startAt) {
        this.dateRangeChange(startAt.current, new Date)
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

      dateRangeChange(startAt, endAt) {
        this.pages.itemsCount = 0;
        this.pages.current = 1;
        this.dataLoading = true;
        let range = { startAt: startAt, endAt: endAt };
        if ( this.currentRef ) {
          this.currentRef.off( 'value', this.firebaseValueCallback );
        }
        this.currentRef = fireface.revenue.byCreated( range, 10 );
        this.currentRef.on( 'value', this.onValue );
      },

      onValue(sales) {
        this.sales = sales.val();
        this.dataLoading = false;
      }
    }
  }
</script>