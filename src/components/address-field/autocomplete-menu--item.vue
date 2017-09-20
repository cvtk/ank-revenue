<template>
    <li :class="[ $style.item, isActive && $style._active ]" @click="onSelect">
      {{ item.typeShort }}. {{ item.name }}
      <span v-if="contentType !== 'city'" :class="$style._lighten"> {{ desc }}</span>
    </li>
</template>

<style lang="scss" module>
  .item {
    display: block;
    border: none;
    overflow: hidden;
    text-overflow: ellipsis;
    outline: none;
    color: #4E5966;
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1;
    cursor: pointer;
    &:hover, &._active { background-color: #e7ecf1 }
    ._lighten { &:before { content: "―" }
      font-size: 12px;
      font-weight: 300;
    }
  }
</style>

<script>

  export default {
    name: 'autocomplete-menu',
    props: ['contentType', 'item', 'isActive'],
    computed: {
      desc() {
        let parents = ( 'parents' in this.item ) && this.item.parents;
        if ( !!parents && parents[parents.length - 1]) {
          return parents[parents.length - 1].typeShort + '. ' + parents[parents.length - 1].name;
        }
      }
    },
    methods: {
      onSelect() {
        this.$emit('select', this.item);
      }
    }
  }
</script>