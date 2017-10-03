<template>
  <div :class="$style.root">
    <div :class="$style._row">
      <div :class="$style.root__portlet">
        <default-portlet label="Продажи" v-model="salesRange">
          <default-chart :startAt="salesRange.current" />
        </default-portlet>
      </div>
      <div :class="$style.root__portlet">
        <default-portlet label="Сотрудники" v-model="employeeRange">
          <sales-top :startAt="employeeRange.current" />
        </default-portlet>
      </div>
    </div>
    <div :class="$style._row">
      <div :class="[ $style.root__portlet, $style._full ]">
        <default-portlet label="Период к периоду" v-model="compareRange">
          <compare-chart :range="compareRange.current" />
        </default-portlet>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  @import "../assets/styles/mixins.scss";

  .root { 
    @media (max-width: 992px) {
      .root__portlet { width: 100% }
    }
  }

  ._row {
    &:after { @include clearfix }
    margin-left: -15px;
    margin-right: -15px;
  }

  .root__portlet {
    &:after { @include clearfix }
    width: 50%;
    float: left;
    position: relative;
    overflow: hidden;
    min-height: 1px;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 45px;
    &._full { width: 100% }
  }
  
</style>

<script>

  import DefaultPortlet from './default-portlet/default-portlet.vue';
  import DefaultChart from './default-chart/default-chart.vue';
  import CompareChart from './compare-chart/compare-chart.vue';
  import SalesTop from './sales-top/sales-top.vue';

  export default {
    name: 'root',
    components: { DefaultPortlet, DefaultChart, SalesTop, CompareChart },
    data() {
      return {
        salesRange: {
          current: 'month',
          items: [
            { label: 'Неделя', title: 'На этой неделе', value: 'week', isActive: false },
            { label: 'Месяц', title: 'За текущий месяц', value: 'month', isActive: true },
            { label: 'Квартал', title: 'В этом квартале', value: 'quarter', isActive: false },
            { label: 'Год', title: 'В текущем году', value: 'year', isActive: false }
          ]
        },

        employeeRange: {
          current: 'month',
          items: [
            { label: 'Неделя', title: 'На этой неделе', value: 'week', isActive: false },
            { label: 'Месяц', title: 'За текущий месяц', value: 'month', isActive: true },
            { label: 'Квартал', title: 'В этом квартале', value: 'quarter', isActive: false },
            { label: 'Год', title: 'В текущем году', value: 'year', isActive: false }
          ]
        },

        compareRange: {
          current: 'month',
          items: [
            { label: 'Неделя', title: 'На этой неделе', value: 'week', isActive: false },
            { label: 'Месяц', title: 'За текущий месяц', value: 'month', isActive: true },
            { label: 'Год', title: 'В текущем году', value: 'year', isActive: false }
          ]
        }
      }
    }
  }
</script>