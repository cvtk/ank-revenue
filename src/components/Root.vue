<template>
  <div :class="$style.root">
    <div :class="$style._row">
      <div :class="$style.root__portlet">
        <default-portlet label="Продажи" v-model="salesRange">
          <default-chart />
        </default-portlet>
      </div>
      <div :class="$style.root__portlet">
        <default-portlet>
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
        salesData: null,
        salesRange: [
          { label: 'Неделя', title: 'На этой неделе', value: 'week', isActive: true },
          { label: 'Месяц', title: 'За текущий месяц', value: 'month', isActive: false },
          { label: 'Квартал', title: 'В этом квартале', value: 'quarter', isActive: false }
        ]
      }
    }
  }
</script>