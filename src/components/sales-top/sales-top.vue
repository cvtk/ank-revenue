<template>
  <div :class="$style.top">
    <default-loader v-if="dataLoading" />
    <div :class="$style.top__results">
      <div :class="$style.results">
        <div :class="$style.results__item">
          <div :class="$style.item">
            <div :class="$style.item__title">Общая сумма</div>
            <div :class="$style.item__value_total">{{ results.total | _priceFormat }}<span :class="$style.ruble"></span></div>
          </div>
        </div>
        <div :class="$style.results__item">
          <div :class="$style.item">
            <div :class="$style.item__title">Группа №1</div>
            <div :class="$style.item__value_group_1">{{ results.group_1 | _priceFormat }}<span :class="$style.ruble"></span></div>
          </div>
        </div>
        <div :class="$style.results__item">
          <div :class="$style.item">
            <div :class="$style.item__title">Группа №2</div>
            <div :class="$style.item__value_group_2">{{ results.group_2 | _priceFormat }}<span :class="$style.ruble"></span></div>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.top__employees">
      <table :class="$style.employees">
        <thead :class="$style.employees__head">
          <tr>
            <th>№</th>
            <th>Сотрудник</th>
            <th>Группа</th>
            <th>Продажи</th>
          </tr>
        </thead>
        <tbody :class="$style.employees__body">
          <tr v-for="employee in employeesPages">
            <td>{{ employee.index }}</td>
            <td>{{ employee.name }}</td>
            <td>{{ employee.group }}</td>
            <td :class="$style._strong">{{ employee.sum | _priceFormat }} р.</span></td>
          </tr>
        </tbody>
      </table>
      <div :class="$style.body__no_results" v-if="employeesPages === 0"> {{ getEmptyMessage() }} </div>
    </div>
    <div :class="$style.top__pagination">
      <default-pagination small v-model="pages" /> 
    </div>
  </div>
</template>

<style lang="scss" module>
  @import "../../assets/styles/mixins.scss";

  .top {
    position: relative;
  }
  .top__results {
    position: relative;
    margin-bottom: 15px;
  }

  .results {
    &:after { @include clearfix }
    margin-left: -15px;
    margin-right: -15px;
  }

  .results__item {
    position: relative;
    float: left;
    width: 33.33333333%;
    min-height: 1px;
    padding-left: 15px;
    padding-right: 15px;
  }

  .item { position: relative }

  .item__title {
    color: #525e64;
    font-size: 13px;
    text-align: center;
  }

  .item__value_total {
    color: #EF4836;
    font-size: 22px;
    text-align: center;
  }
  .item__value_group_1 {
    color: #32c5d2;
    font-size: 22px;
    text-align: center;
  }
  .item__value_group_2 {
    color: #8E44AD;
    font-size: 22px;
    text-align: center;
  }

  .top__employees { height: 280px }

  .employees {
    border: none;
    width: 100%;
    margin: 0;
    background-color: #fff;
    max-width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
  }

  .employees__head {
    tr { text-transform: uppercase }
    th {
      text-align: left;
      font-weight: 600;
      font-size: 13px;
      color: #93a2a9;
      border: 0;
      border-bottom: 1px solid #F2F5F8;
      white-space: nowrap;
      padding: 8px;
    }
  }
  .employees__body {
    tr:nth-child(odd) { background-color: rgba(92, 155, 209, 0.1) }
    td {
      border-bottom: 1px solid #F2F5F8;
      color: #8896a0;
      vertical-align: middle;
      padding: 6px;
      font-size: 14px;
      font-weight: 300;
    }
  }

  .body__no_results {
    border-bottom: 1px solid #F2F5F8;
    color: #8896a0;
    padding: 6px;
    font-size: 14px;
    font-weight: 300;
    text-align: center;
  }
  
  ._strong { font-weight: 600 !important }

  .top__pagination { text-align: right }

  .ruble {
    display: inline-block;
    background-image: url("../../assets/icons/ruble.svg");
    background-repeat: no-repeat;
    height: 16px;
    width: 16px;
    vertical-align: middle;
  }

</style>

<script>
  import DefaultPagination from '../default-pagination/default-pagination.vue';
  import DefaultLoader from '../default-loader/default-loader.vue';
  import fireface from '../../helpers/firebase-iface.js';
  import h from '../../helpers/helpers.js';

  export default {
    name: 'sales-top',
    filters: h,
    components: { DefaultPagination, DefaultLoader },
    props: {
      startAt: { default: 'week', type: String },
      endAt() { return { default: new Date, type: Date } }
    },
    data() {
      return {
        results: {},
        dataLoading: true,
        currentRef: null,
        employees: {},
        pages: {
          current: 1,
          itemsPerPage: 7,
          itemsCount: 10
        }
      }
    },
    mounted() {
      this.salesRemount();
    },
    computed: {
      employeesPages() {
        if ( this.employees.length ) {
          let startAt = (this.pages.current - 1) * this.pages.itemsPerPage,
              endAt = this.pages.current * this.pages.itemsPerPage
          return this.employees.slice(startAt, endAt);
        } else return 0;
      }
    },
    watch: {
      startAt(value) {
        this.salesRemount();
      }
    },
    methods: {
      getEmptyMessage() {
        switch(this.startAt) {
          case 'week': return 'На этой неделе продаж не было';
          case 'month': return 'В этом месяце продаж не было';
          case 'quarter': return 'В этом квартале продаж не было';
          case 'year': return 'В этом году продаж не было';
        }
      },
      groupBy(arr, key) {
        return arr.reduce(function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      },

      salesRemount() {
        this.dataLoading = true;
        let range = { startAt: this.startAt, endAt: this.endAt };
        if ( this.currentRef ) {
          this.currentRef.off( 'value', this.salesCallback );
        }
        this.currentRef = fireface.revenue.byCreated(range);
        this.currentRef.on( 'value', this.salesCallback );
      },

      salesCallback(sales) {
        let arrByEmployee = this.groupBy( h._objToArr(sales.val()), 'employee'),
            arrBySum = [];
        this.results = { total: 0, group_1: 0, group_2: 0 };

        for ( let key in arrByEmployee ) {

          let sum = arrByEmployee[key].reduce( (sum, c) => sum + c.commission, 0 ),
              lastSale = arrByEmployee[key].length - 1,
              group = arrByEmployee[key][lastSale].group;
          
          arrBySum.push({ name: key, sum: sum, group: group  })
          this.results.total += sum;
          if ( group === 'Офис 1' ) this.results.group_1 += sum
          else this.results.group_2 += sum;
        }
        this.pages.current = 1;
        this.pages.itemsCount = arrBySum.length;
        this.employees = arrBySum.sort( (a, b) => b.sum - a.sum).map( ( item, i ) => {
          item.index = i + 1;
          return item;
        });
        this.dataLoading = false;
      }
    }
  }
</script>