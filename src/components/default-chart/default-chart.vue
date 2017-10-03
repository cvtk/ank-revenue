<template>
  <div :class="$style.chart">
    <default-loader v-if="dataLoading" />
    <line-chart v-if="type === 'sales'" 
      :chart-data="salesData"
      :options="lineChartOptions"
      :height="400">
    </line-chart>
  </div>
</template>

<style lang="scss" module>
  .chart {
    position: relative;
  }
</style>

<script>
  import LineChart from './line-chart.js';
  import DefaultLoader from '../default-loader/default-loader.vue';
  import fireface from '../../helpers/firebase-iface.js';
  import h from '../../helpers/helpers.js';

  export default {
    name: 'default-chart',
    components: { LineChart, DefaultLoader },
    props: {
      type: { default: 'sales', type: String },
      startAt: { default: 'week', type: String },
      endAt() { return { default: new Date, type: Date } }
    },
    data() {
      return {
        dataLoading: true,
        salesData: null,
        currentRef: null,
        lineChartOptions: {
          elements: { point: { radius: 1, hitRadius: 2 } },
          maintainAspectRatio: false
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
        this.dataLoading = true;
        let range = { startAt: this.startAt, endAt: this.endAt };
        if ( this.currentRef ) {
          this.currentRef.off( 'value', this.salesCallback );
        }
        this.currentRef = fireface.revenue.byCreated(range);
        this.currentRef.on( 'value', this.salesCallback );
      },

      salesCallback(sales) {
        let group_1 = { sum: [], dates: [] },
            group_2 = { sum: [], dates: [] };

        this._iterateByDay(sales.val(), day => {
          let sum = { group_1: 0, group_2: 0}
          day.forEach( (item ) => {
            if ( item.employee.group === 'Офис Чкалова') { sum.group_1 += item.commission }
            else { sum.group_2 += item.commission }
          });
          let tmpdate = h._moment(day[0].created * 1000).format('DD.MM.YY'),
              date = { group_1: tmpdate, group_2: tmpdate };
          group_1.sum.push(sum.group_1);
          group_1.dates.push(date.group_1);

          group_2.sum.push(sum.group_2);
          group_2.dates.push(date.group_2);
        });

        this.dataLoading = false;
        this.salesData = {
          labels: group_1.dates,
          datasets: [
            {
              label: 'Офис Чкалова',
              backgroundColor: 'rgba(50, 197, 210, 0.3)',
              borderColor: '#32c5d2',
              borderWidth: 1,
              data: group_1.sum
            },
            {
              label: 'Офис Свердлова',
              backgroundColor: 'rgba(142, 68, 173, 0.3)',
              borderColor: '#8e44ad',
              borderWidth: 1,
              data: group_2.sum
            }
          ]
        }
      }
    }
  }
</script>