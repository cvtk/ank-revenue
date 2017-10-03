<template>
  <tr :class="$style.sales_row" @click="onClick">
    <td :class="$style.sales_row__column">{{ sale.created | _unixToHumanDate }}</td>
    <td :class="$style.sales_row__column">
      {{ sale.city.typeShort }}. {{ sale.city.name }},
      {{ sale.street.typeShort }}. {{ sale.street.name }},
      {{ sale.building.typeShort }}. {{ sale.building.name }}
      (комнат: {{ sale.room }})
    </td>
    <td :class="$style.sales_row__column">
      {{ sale.price | _priceFormat }}<span :class="$style.ruble_icon"></span>
      <span :class="[ $style.included, sale.communal_included && $style._visible ]" title="Коммунальные включены"></span>
    </td>
    <td :class="$style.sales_row__column">{{ sale.commission | _priceFormat }}<span :class="$style.ruble_icon"></span></td>
    <td :class="$style.sales_row__column">{{ sale.type | _saleType }}</td>
    <td :class="$style.sales_row__column">{{ sale.partner.name }}</td>
    <td :class="$style.sales_row__column">{{ sale.employee.name }}</td>
    <td :class="$style.sales_row__column">{{ sale.employee.group }}</td>
  </tr>
</template>

<style lang="scss" module>

  .ruble_icon {
    display: inline-block;
    background-image: url("../../assets/icons/ruble.svg");
    background-repeat: no-repeat;
    height: 13px;
    width: 13px;
    vertical-align: bottom;
  }

  .sales_row {
    &:hover { background-color: #e7ecf1; }
  }
  
  .sales_row__column {
    &:first-child { border-left: 1px solid #e7ecf1 }
    cursor: pointer;
    border-bottom: 1px solid #e7ecf1;
    border-right: 1px solid #e7ecf1;
    padding: 10px 5px;
    text-align: center;
    outline: 0;
    vertical-align: middle;
    font-weight: 300;
    font-size: 13px;
  }

  .included {
    visibility: hidden;
    display: inline-block;
    background-image: url("../../assets/icons/include.svg");
    background-repeat: no-repeat;
    background-size: 100%;
    height: 15px;
    width: 15px;
    vertical-align: bottom;
    &._visible { visibility: visible }
  }

</style>

<script>
  import h from '../../helpers/helpers.js';
  

  export default {
    name: 'sales-row',
    props: ['sale'],
    filters: h,
    methods: {
      onClick() {
        this.$emit('select', this.sale);
      }
    }
  }
</script>