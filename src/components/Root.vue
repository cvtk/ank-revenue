<template>
  <div :class="$style.root">
    <div :class="$style._row">
      <div :class="$style.root__portlet">
        <default-portlet label="Продажи" v-model="salesRange">
          <default-chart :startAt="salesStartAt" />
        </default-portlet>
      </div>
      <div :class="$style.root__portlet">
        <default-portlet label="Активность" v-model="employeeRange">
          portlet 2
        </default-portlet>
      </div>
    </div>
    <div :class="$style._row">
      <div :class="$style.root__portlet"></div>
      <div :class="$style.root__portlet"></div>
    </div>
  </div>
</template>

<style lang="scss" module>
  @import "../assets/styles/mixins.scss";

  .root { /* */ }

  ._row {
    &:after { @include clearfix }
    margin-left: -15px;
    margin-right: -15px;
  }

  .root__portlet {
    width: 50%;
    float: left;
    position: relative;
    min-height: 1px;
    padding-left: 15px;
    padding-right: 15px;
  }
  
</style>

<script>

  import DefaultPortlet from './default-portlet/default-portlet.vue';
  import DefaultChart from './default-chart/default-chart.vue';

  export default {
    name: 'root',
    components: { DefaultPortlet, DefaultChart },
    data() {
      return {
        salesRange: [
          { label: 'Неделя', title: 'На этой неделе', value: 'week', isActive: true },
          { label: 'Месяц', title: 'За текущий месяц', value: 'month', isActive: false },
          { label: 'Квартал', title: 'В этом квартале', value: 'quarter', isActive: false },
          { label: 'Все', title: 'За все время', value: 'all', isActive: false }
        ],
        employeeRange: [
          { label: 'Неделя', title: 'На этой неделе', value: 'week', isActive: true },
          { label: 'Месяц', title: 'За текущий месяц', value: 'month', isActive: false },
          { label: 'Квартал', title: 'В этом квартале', value: 'quarter', isActive: false },
          { label: 'Все', title: 'За все время', value: 'all', isActive: false }
        ]
      }
    },
    computed: {
      salesStartAt() {
        let currentRange = this.salesRange.filter( item => item.isActive );
        return currentRange[0].value;
      }
    }
  }
</script>