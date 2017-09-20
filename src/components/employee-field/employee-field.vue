<template>
  <div :class="$style.employee">
    <div :class="$style.employee__select">
      <default-select :options="employees" name-field="name" @change="onEmployeeSelect"
        :defaultValue="local.name"
        :label="label"
        :isDone="isDone"
        :needAttention="needAttention"
      />
      <div :class="$style.employee__button">
        <default-button @click.native="showMenu = !showMenu" icon="plus" :red="!isDone" title="Добавить сотрудника" />
      </div>
    </div>
    <modal-overlay :show="showMenu" @close="showMenu = false">
      <div :class="$style.employee__edit">
        <employee-create />
      </div>
    </modal-overlay>    
  </div>
</template>

<style lang="scss" module>
  .employee {
    position: relative;
  }

  .employee__select {
    margin-right: 33px;
  }

  .employee__button {
    position: absolute;
    top: 12px;
    right: 0;
  }
  .employee__edit {
    position: relative;
  }
</style>

<script>
  import fireface from '../../helpers/firebase-iface.js';
  import DefaultSelect from '../default-select/default-select.vue';
  import DefaultButton from '../default-button/default-button.vue';
  import ModalOverlay from '../modal-overlay/modal-overlay.vue'  
  import EmployeeCreate from './employee-create.vue';

  export default {
    name: 'employee-field',
    components: { DefaultSelect, DefaultButton, EmployeeCreate, ModalOverlay },
    props: ['value', 'needAttention', 'isDone', 'label'],
    data() {
      return {
        showMenu: false,
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
      onEmployeeSelect(employeeIndex) {
        this.$emit('input', this.employees[employeeIndex]);
      },
      onRetrieve(employees) {
        let tmp = [];
        employees.forEach( employee => {
          let obj = employee.val(),
              name = [obj.lastName, obj.firstName].join(' ');

          tmp.push( { name: name, key: obj.key, group: obj.group, groupId: obj.groupId } );
        });
        this.employees = tmp.sort( (a, b) => {
          if ( a.lastName > b.lastName ) return 1;
          if ( a.lastName < b.lastName ) return -1;
        });
      }
    }
  }
</script>