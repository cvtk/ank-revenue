<template>
  <div :class="$style.chart">
    <line-chart v-if="type === 'sales'" 
      :chart-data="salesData"
      :options="{ maintainAspectRatio: false }"
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
        currentRef: null
      }
    },
    mounted() {
      if ( this.type === 'sales' ) {
        this.salesRemount();
      }
    },
    methods: {
      _iterateByDay(sales, callback) {
        let arr = [];
        h._objToArr(sales).forEach( item => {
          let index = new Date(item.created * 1000).getDate();
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
        switch(this.startAt) {
          case 'week': {
            let days = { sum: [], date: [] };
            this._iterateByDay(sales.val(), day => {
              let sum = null;
              day.forEach( item => sum += item.commission );
              days.sum.push(sum);
              days.date.push(h._unixToHumanDate(day[0].created));
            })
            this.salesData = {
              labels: days.date,
              datasets: [
                {
                  label: 'Офис №1',
                  backgroundColor: 'rgba(92, 155, 209, 0.3)',
                  borderColor: '#5C9BD1',
                  borderWidth: 1,
                  data: days.sum
                }, 
                {
                  label: 'Офис №2',
                  backgroundColor: 'rgba(239, 72, 54, 0.3)',
                  borderColor: '#EF4836',
                  borderWidth: 1,
                  data: days.sum
                }
              ]
            }
          }
        }
      },

      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>