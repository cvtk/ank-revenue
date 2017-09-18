<template>
  <div :class="$style.employee">
    <default-field :value="value" type="text"
      ref="input"
      :label="label"
      :isDone="isDone"
      :needAttention="needAttention"
    />
    <div :class="$style.employee__create">
      <employee-create />
    </div>
  </div>
</template>

<style lang="scss" module>
  .employee {
    position: relative;
  }

  .employee__create {
    position: relative;
    top: -1px;
  }
</style>

<script>
  import fireface from '../../helpers/firebase-iface.js';
  import DefaultField from '../default-field/default-field.vue';
  import EmployeeCreate from './employee-create.vue';

  export default {
    name: 'employee-field',
    components: { DefaultField, EmployeeCreate },
    props: ['value', 'needAttention', 'isDone', 'label'],
    data() {
      return {
        local: this.value,
        employees: [],
        ref: null
      }
    },
    created() {
      this.ref = fireface.employees.get();
      this.ref.on('value', this.onRetrieve);
    },
    methods: {
      onRetrieve(employees) {
        let tmp = [];
        employees.forEach( employee => {
          tmp.push( employee.val() );
        });
        this.employees = tmp.sort( (a, b) => {
          if ( a.lastName > b.lastName ) return 1;
          if ( a.lastName < b.lastName ) return -1;
        });
        
      }
    }
  }
</script>