<template>
  <tr :class="$style.sales_row">
    <td :class="$style.sales_row__column">{{ sale.created | _unixToHumanDate }}</td>
    <td :class="$style.sales_row__column">{{ sale.address.city.name }}, {{ sale.address.street.name }}</td>
    <td :class="$style.sales_row__column">{{ sale.price | _priceFormat }}<span :class="$style.ruble_icon"></span></td>
    <td :class="$style.sales_row__column">{{ sale.commission | _priceFormat }}<span :class="$style.ruble_icon"></span></td>
    <td :class="$style.sales_row__column">{{ sale.partner }}</td>
    <td :class="$style.sales_row__column">{{ sale.employee }}</td>
  </tr>
</template>

<style lang="scss" module>

  .ruble_icon {}

  .sales_row:nth-child(even) { background-color: #eff3f8 }

  .sales_row__column {
    &:first-child { border-left: 1px solid #e7ecf1 }
    cursor: default;
    border-right: 1px solid #e7ecf1;
    padding: 10px 5px;
    text-align: center;
    outline: 0;
    vertical-align: middle;
    font-weight: 300;
    font-size: 13px;
  }

</style>

<script>
  import hlp from '../../helpers/helpers.js';

  export default {
    name: 'sales-row',
    props: ['sale'],
    filters: hlp,
    data() {
      return {}
    },
    methods: {}
  }
</script>