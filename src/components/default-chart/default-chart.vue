<template>
  <div :class="$style.chart">
    <line-chart v-if="type === 'sales'" 
      :chart-data="salesData"
      :options="lineChartOptions"
      :height="400">
    </line-chart>
  </div>
</template>

<style lang="scss" module>
  .chart {  }
</style>

<script>
  import LineChart from './line-chart.js';
  import fireface from '../../helpers/firebase-iface.js';
  import h from '../../helpers/helpers.js';

  export default {
    name: 'default-chart',
    components: { LineChart },
    props: {
      type: { default: 'sales', type: String },
      startAt: { default: 'week', type: String },
      endAt() { return { default: new Date, type: Date } }
    },
    data() {
      return {
        salesData: null,
        currentRef: null,
        lineChartOptions: {
          maintainAspectRatio: false,
          scales: {
            xAxes: [{ ticks: { minRotation: 90, labelOffset: -5 } }]
          }
        }
      }
    },
    mounted() {
      if ( this.type === 'sales' ) {
        this.salesRemount();
      }
    },
    watch: {
      startAt(value) {
        this.salesRemount();
      }
    },
    methods: {
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
      },

      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>