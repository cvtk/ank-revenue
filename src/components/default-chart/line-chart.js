import { Line, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default Line.extend({
  name: 'line-chart',
  mixins: [ reactiveProp ],
  props: [ 'options' ],
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
})