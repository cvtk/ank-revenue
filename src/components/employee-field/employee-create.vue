<template>
  <div :class="$style.create">
    <h5 :class="$style.create__title">Добавить нового сотрудника:</h5>
    <div :class="$style._wrapper">
      <div :class="$style.create__item">
        <default-field v-model="firstName" type="text"
          label="Имя"
          :isDone="validateName"
        />
      </div>
      <div :class="$style.create__item">
        <default-field v-model="lastName" type="text"
          label="Фамилия"
          :isDone="validateSurname"
        />
      </div>
      <div :class="$style.create__item">
        <default-select :options="groups" label="Группа" @change="onGroupSelect" :isDone="group && groupId" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  @import "../../assets/styles/mixins.scss";
  .create {
    position: relative;
    padding: 10px;
    border: 1px solid #c2cad8;
  }

  .create__title {
    margin-bottom: 5px;
    font-weight: 400;
    color: #94A0B2;
  }

  ._wrapper {
    &:after { @include clearfix }
    position: relative;
    margin: 0 -5px;
  }

  .create__item {
    float: left;
    width: 33.333333%;
    padding: 0 5px;
  }
</style>

<script>
  import fireface from '../../helpers/firebase-iface.js';
  import DefaultField from '../default-field/default-field.vue';
  import DefaultSelect from '../default-select/default-select.vue';

  export default {
    name: 'employee-create',
    components: { DefaultField, DefaultSelect },
    data() {
      return {
        firstName: '', lastName: '', groupId: '', group: '',
        groups: []
      }
    },
    created() {
      fireface.groups.get().on('value', groups => {
        let tmp = [];
        groups.forEach( group => { tmp.push( group.val() ) })
        this.groups = tmp;
      });
      
    },
    computed: {
      validateName() {
        return (/\S/.test(this.firstName));
      },
      validateSurname() {
        return (/\S/.test(this.lastName));
      }
    },
    methods: {
      onSave(employee) {
        
      },
      onGroupSelect(groupIndex) {
        this.group = this.groups[groupIndex].name;
        this.groupId = this.groups[groupIndex].key;
      }
    }
  }
</script>