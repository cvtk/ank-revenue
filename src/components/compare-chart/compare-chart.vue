<template>
  <div :class="$style.chart">
    <default-loader v-if="dataLoading" />
    <div :class="$style.chart__range">
      <div :class="$style.range">
        <div :class="$style.range__endAt">
          <default-select :options="currentRange" name-field="name" @change="onSecondChange"
            label="Период 2"
            :isDone="secondPeriod.startAt"
            :needAttention="secondPeriod.startAt"
          />
        </div>
        <div :class="$style.range__divider">/</div>
        <div :class="$style.range__startAt">
          <default-select :options="currentRange" name-field="name" @change="onFirstChange"
            label="Период 1"
            :isDone="firstPeriod.startAt"
            :needAttention="firstPeriod.startAt"
          />
        </div>
      </div>
    </div>
    <line-chart
      :chart-data="salesData"
      :options="lineChartOptions"
      :height="400">
    </line-chart>
  </div>
</template>

<style lang="scss" module>
  @import "../../assets/styles/mixins.scss";

  .chart {
    position: relative;
  }

  .chart__range {
    position: relative;
  }

  .range {
    &:after { @include clearfix }
  }
  
  .range__divider {
    float: right;
    margin: 0 10px;
    font-size: 20px;
    font-weight: 300;
    padding-top: 14px;
  }

  .range__startAt {
    float: right;
    width: 115px;
  }
  .range__endAt {
    float: right;
    width: 115px;
  }
</style>

<script>
  import LineChart from './line-chart.js';
  import DefaultLoader from '../default-loader/default-loader.vue';
  import DefaultSelect from '../default-select/default-select.vue';
  import fireface from '../../helpers/firebase-iface.js';
  import h from '../../helpers/helpers.js';

  export default {
    name: 'compare-chart',
    components: { LineChart, DefaultLoader, DefaultSelect },
    props: {
      range: { default: 'week', type: String }
    },
    data() {
      return {
        firstData: {},
        secondData: {},
        firstPeriod: { startAt: 0, endAt: 0 },
        secondPeriod: { startAt: 0, endAt: 0 },
        currentRange: [{name: ''}, {name: ''}],
        dataLoading: true,
        salesData: { labels: null, datasets: [ { label: null }, { label: null } ] },
        currentRef: null,
        label: null,
        lineChartOptions: {
          elements: { point: { radius: 1, hitRadius: 2 } },
          maintainAspectRatio: false
        }
      }
    },
    created() {
      this.getRange();
    },
    watch: {
      firstData(value) {
        this.chartRender();
      },
      secondData(value) {
        this.chartRender();
      },
      range(value) {
        this.getRange();
      }
    },
    methods: {
      chartRender() {
        let labels = [];
        switch(this.range) {
          case 'week': labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']; break;
          case 'month': labels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]; break;
          case 'quarter': labels = ['1 месяц', '2 месяц', '3 месяц']; break;
          case 'year': labels = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Декабрь']; break;
        }
        this.salesData = {
          labels: labels,
          datasets: [
            {
              label: this.firstPeriod.name,
              backgroundColor: 'rgba(92, 155, 209, 0.3)',
              borderColor: '#5C9BD1',
              borderWidth: 1,
              data: this.firstData
            },
            {
              label: this.secondPeriod.name,
              backgroundColor: 'rgba(239, 72, 54, 0.3)',
              borderColor: '#EF4836',
              borderWidth: 1,
              data: this.secondData
            }
          ]
        }
      },
      onFirstChange(period) {
        this.firstPeriod = this.currentRange[period];
        let sum = [];
        this.dataLoading = true;

        fireface.revenue.byPeriod(this.currentRange[period].startAt, this.currentRange[period].endAt).on('value', sales => {
          this._iterateByDay(sales.val(), day => {
            sum.push(day.reduce( (res, item ) => {
              if ( item ) { res += item.commission; return res }
              return res;
            }, 0 ));
          });

          this.dataLoading = false;
          sum.splice(0, 1);
          this.firstData = sum;
        })
      },
      onSecondChange(period) {
        this.secondPeriod = this.currentRange[period];
        let sum = [];
        this.dataLoading = true;

        fireface.revenue.byPeriod(this.currentRange[period].startAt, this.currentRange[period].endAt).on('value', sales => {
          this._iterateByDay(sales.val(), day => {
            sum.push(day.reduce( (res, item ) => {
              if ( item ) { res += item.commission; return res }
              return res;
            }, 0 ));
          });

          this.dataLoading = false;
          sum.splice(0, 1);
          this.secondData = sum;
        })
      },
      getRange() {
        let type = this.range, format = '', p = '';

        switch(this.range) {
          case 'week': { format = 'wo неделя, YYYY'; p = 'w'; }; break;
          case 'month': { format = 'MMMM, YYYY'; p = 'M'; }; break;
          case 'quarter': { format = 'Q кв. YYYY'; p = 'Q'; }; break;
          case 'year': { format =  'YYYY'; p = 'y'; }; break;
        }

        fireface.revenue.getEarliestDate( unix => {
          let startDate = h._moment(unix * 1000);
          let now = h._moment().startOf('day');
          let startAt = startDate.clone().startOf(type).add(0, p);
          let months = [];

          while (startAt.isBefore(now)) {
              let startOf = startAt.startOf('day'),
                  endOf = h._moment(startAt).endOf(type),
                  name = startAt.format(format) + ' ( ' + startOf.format('DD.MM') + ' - ' + endOf.format('DD.MM') + ' )';

              months.push({ name: name, startAt: startOf.unix(), endAt: endOf.unix() });
              startAt.add(1, p);
          }
          this.currentRange = months.reverse();
          this.onSecondChange(0);
          this.onFirstChange(0);
          this.dataLoading = false;
        })
      },

      getDays() {
        switch(this.range) {
          case 'week': return 7; break;
          case 'month': return 30; break;
          case 'quarter': return 3; break;
          case 'year': return 12; break;
        }
      },

      _iterateByDay(sales, callback) {
        let arr = [];

        for ( let i = 0; i <= this.getDays(); i++ ) {
          arr.push([]);
        }

        h._objToArr(sales).forEach( item => {
          let momObj = h._moment(item.created * 1000),
              index = 0;
          switch(this.range) {
            case 'week': index = momObj.day(); break;
            case 'month': index = momObj.date(); break;
            case 'quarter': index = momObj.month(); break;
            case 'year': index = momObj.month(); break;
          }

          arr[index].push(item);
        });
        arr.forEach( item => callback(item) );
      }
    }
  }
</script>