<template>
  <div :class="[ $style.pagination, small && $style._small, pages <= 1 && $style._hidden ]">
    <span :class="$style.pagination__button" v-if="local.current > 2" title="Первая" @click="onPageSelect(1)">1</span>
    <span v-if="local.current > 3" :class="$style.pagination__dots">...</span>
    <span v-for="page in pages" @click="onPageSelect(page)"
      :class="[ $style.pagination__button, local.current === page && $style._active ]"
      :title="'Страница: ' + page"
      v-if="page < local.current + 2 && page > local.current - 2">
      {{ page }}
    </span>
    <span v-if="local.current < pages -2" :class="$style.pagination__dots">...</span>
    <span :class="$style.pagination__button" v-if="local.current < pages - 1" title="Последняя" @click="onPageSelect(pages)">
      {{pages}}
    </span>
    <span :class="$style.pagination__button" title="Назад" @click="onStepBack"><</span>
    <span :class="$style.pagination__button" title="Вперед" @click="onStepForward">></span>
  </div>
</template>

<style lang="scss" module>
  .pagination {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    padding: 6px 0 14px;
    &._small {
      .pagination__button {
        font-weight: 400;
        font-style: 12px;
        padding: 3px 0;
        width: 19px;
        line-height: 1;
      }
    }
  }

  ._hidden { visibility: hidden }

  .pagination__button {
    padding: 4px 0px;
    width: 27px;
    font-size: 13px;
    line-height: 1.5;
    color: #94A0B2;
    background-color: transparent;
    user-select: none;
    display: inline-block;
    font-weight: 600;
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    white-space: nowrap;
    margin: 0 5px;
    &:hover, &._active {
      background-color: #94A0B2;
      color: #FFF;
    }
  }

  .pagination__dots {
    user-select: none;
    color: #94A0B2;
    font-weight: 400;
    font-style: 12px;
    padding: 3px 6px;
    line-height: 1;
  }
</style>

<script>
  export default {
    name: 'default-pagination',
    props: {
      small: { default: false, type: Boolean },
      value: {
        default() { 
          return {
            current: 1,
            itemsPerPage: 10,
            itemsCount: 0
          }
        },
        type: Object
      }
    },
    data() {
      return {
        local: this.value
      }
    },
    watch: {
      local: function() {
        this.$emit('input', this.local);
      }
    },
    computed: {
      pages() {
        return Math.ceil(this.local.itemsCount / this.local.itemsPerPage);
      }
    },
    methods: {
      onStepForward() {
        if ( this.local.current !== this.pages ) {
          this.local.current += 1;
        }
      },
      onStepBack() {
        if ( this.local.current !== 1 ) {
          this.local.current -= 1;
        }
      },
      onPageSelect(page) {
        this.local.current = page;
      },

      onClick(index) {
        this.local.items[this.current].isActive = false;
        this.local.items[index].isActive = true;
        this.local.current = this.local.items[index].value;
        this.current = index;
        this.$emit('input', this.local);
      }
    }
  }
</script>