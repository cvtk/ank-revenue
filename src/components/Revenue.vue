<template>
  <div :class="$style.revenue_component">
    <div :class="$style.revenue_component__tool_bar">
      <div :class="$style.tool_bar">
        <div :class="$style.tool_bar__table_caption">
          <div :class="$style.table_caption">
            <span :class="$style.table_caption__icon"></span>
            <h2 :class="$style.table_caption__title">Продажи за период</h2>
          </div>
        </div>
        <div :class="$style.tool_bar__table_period">
          <div :class="$style.table_period">
            <span :class="$style.table_period__button">Квартал</span>
            <span :class="$style.table_period__button">Месяц</span>
            <span :class="$style.table_period__button">Неделя</span>
            <span :class="[ $style.table_period__button, $style._active ]">Сегодня</span>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.revenue_component__list_actions">
      <div :class="$style.list_actions">
        <span :class="$style.list_actions__add_new">Добавить продажу</span>
      </div>
    </div>
    <div :class="$style.revenue_component__items_list">
      <table :class="$style.items_list">
        <thead :class="$style.items_list__header">
          <tr :class="$style.items_list__row">
            <th :class="$style.items_list__column">Дата</th>
            <th :class="$style.items_list__column">Адрес</th>
            <th :class="$style.items_list__column">Цена аренды</th>
            <th :class="$style.items_list__column">Комиссия</th>
            <th :class="$style.items_list__column">Контрагент</th>
            <th :class="$style.items_list__column">Сотрудник</th>
          </tr>
        </thead>
        <tbody :class="$style.items_list__content"></tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" module>
  @import "../assets/styles/mixins.scss";
  .revenue_component {
    background-color: #fff;
    padding: 15px 20px;
    overflow: hidden;
    .revenue_component__tool_bar {
      &:after { @include clearfix }
      margin-bottom: 10px;
    }
    .revenue_component__list_actions {
      &:after { @include clearfix }
      padding: 10px 0;
    }
    .revenue_component__items_list {
      &:after { @include clearfix }
      margin: 10px 0;
    }
  }

  .tool_bar {
    &:after { @include clearfix }
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;

    .tool_bar__table_caption {
      &:after { @include clearfix }
      float: left;
      margin-top: 4px;
      margin-bottom: 4px
    }

    .tool_bar__table_period { float: right }
  }
  
  .table_caption {
    .table_caption__icon {
      display: block;
      float: left;
      background-image: url("../assets/icons/revenue.svg");
      background-repeat: no-repeat;
      background-size: 100%;
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
    .table_caption__title {
      display: block;
      float: left;
      font-size: 16px;
      text-transform: uppercase;
      font-weight: 700;
      line-height: 20px;
      color: #2f353b;
      letter-spacing: -0.5px;
      margin-top: 1px;
    }
  }
  
  .table_period  {
    &:after { @include clearfix }
    .table_period__button {
      display: block;
      float: right;
      padding: 4px 10px;
      font-size: 13px;
      line-height: 1.5;
      border: 1px solid #2f353b;
      cursor: pointer;
      color: #2f353b;
      background-color: #fff;
      border-radius: 25px;
      white-space: nowrap;
      user-select: none;
      margin-left: 10px;
      width: 75px;
      text-align: center;
      transition: border-color .5s, background-color .15s, color .15s;
      &:last-child { margin-left: 0 }
      &:hover, &._active {
        border-color: #2f353b;
        color: #fff;
        background-color: #2f353b;
      }
    }
  }

  .list_actions {
    &:after { @include clearfix }
    .list_actions__add_new {
      display: block;
      float: left;
      color: #FFF;
      background-color: #32c5d2;
      font-weight: 600;
      touch-action: manipulation;
      cursor: pointer;
      border: 1px solid #32c5d2;
      white-space: nowrap;
      padding: 6px 12px;
      font-size: 14px;
      user-select: none;
      line-height: 20px;
      transition: border-color .5s, background-color .15s;
      &:after {
        content: "";
        display: inline-block;
        background-image: url("../assets/icons/plus.svg");
        background-repeat: no-repeat;
        background-size: cover;
        width: 13px;
        height: 13px;
        vertical-align: middle;
        margin-left: 5px;
      }
      &:hover {
        background-color: #26a1ab;
        border-color: #2499a3;
      }
    }
  }

  .items_list {
    width: 100%;
    margin: 0;
    border-top: 1px solid #e7ecf1;
    border-bottom: 1px solid #e7ecf1;
    box-sizing: content-box;
    border-spacing: 0;
    .items_list__header { /* */ }
    .items_list__row { /* */ }
    .items_list__column {
      &:first-child { border-left: 1px solid #e7ecf1 }
      border-right: 1px solid #e7ecf1;
      padding: 10px 5px;
      text-align: center;
      outline: 0;
      vertical-align: middle;
    }
  }

</style>

<script>
  export default {
    name: 'revenue'
  }
</script>