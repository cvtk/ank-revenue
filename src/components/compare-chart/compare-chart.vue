<template>
  <div :class="$style.chart">
    <default-loader v-if="dataLoading" />
    <div :class="$style.chart__range">
      <div :class="$style.range">
        <div :class="$style.range__startAt">
          <default-select :options="currentRange" name-field="name" @change="onFirstChange"
            label="Период 2"
            :isDone="firstPeriod.startAt"
            :needAttention="firstPeriod.startAt"
          />
        </div>
        <div :class="$style.range__divider">/</div>
        <div :class="$style.range__endAt">
          <default-select :options="currentRange" name-field="name" @change="onSecondChange"
            label="Период 1"
            :isDone="secondPeriod.startAt"
            :needAttention="secondPeriod.startAt"
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
        firstPeriod: { startAt: 0, endAt: 0 },
        secondPeriod: { startAt: 0, endAt: 0 },
        currentRange: [],
        dataLoading: true,
        salesData: null,
        currentRef: null,
        label: null,
        lineChartOptions: {
          elements: { point: { radius: 1, hitRadius: 2 } },
          maintainAspectRatio: false
        }
      }
    },
    created() {
      this.salesRemount();
    },
    watch: {
      range(value) {
        this.salesRemount();
      }
    },
    methods: {
      onFirstChange(period) {
        this.firstPeriod = this.currentRange[period];
      },
      onSecondChange(period) {
        this.secondPeriod = this.currentRange[period];
      },
      getRange(type, format, p) {
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
        })
      },

      _iterateByDay(sales, callback) {
        let arr = [];
        h._objToArr(sales).forEach( item => {
          let index = h._moment(item.created * 1000).dayOfYear();
          if(typeof arr[index] === 'undefined') {
            arr[index] = [];
          }
          arr[index].push(item);
        });
        arr.forEach( item => {
          if ( !h._isEmptyObject(item) ) {
            return callback(item);
          }
        })
      },

      salesRemount() {
        this.dataLoading = true;

        switch(this.range) {
          case 'week': { this.getRange(this.range, 'wo неделя, YYYY', 'w') }; break;
          case 'month': { this.getRange(this.range, 'MMMM, YYYY', 'M') }; break;
          case 'quarter': { this.getRange(this.range, 'Q кв. YYYY', 'Q') }; break;
          case 'year': { this.getRange(this.range, 'YYYY', 'y') }; break;
        }

        let range = { startAt: this.startAt, endAt: this.endAt };
        if ( this.currentRef ) {
          this.currentRef.off( 'value', this.salesCallback );
        }
        this.currentRef = fireface.revenue.byCreated(range);
        this.currentRef.on( 'value', this.salesCallback );
      },

      salesCallback(sales) {
        let days = { sum: [], date: [] };
        this._iterateByDay(sales.val(), day => {
          let sum = null,
              date = null,
              format = '';

          switch(this.startAt) {
            case 'week': format = 'ddd, MMM D'; break;
            case 'all': format = 'DD.MM.YY'; break;
            default: format = 'D MMM';
          }

          date = h._moment(day[0].created * 1000).format(format);
          day.forEach( item => sum += item.commission );
          days.sum.push(sum);
          days.date.push(date);
        });
        this.dataLoading = false;
        this.salesData = {
          labels: days.date,
          datasets: [
            {
              label: 'Общие продажи',
              backgroundColor: 'rgba(92, 155, 209, 0.3)',
              borderColor: '#5C9BD1',
              borderWidth: 1,
              data: days.sum
            }
          ]
        }
      }
    }
  }
</script>