<template>
  <div :class="$style.crud">
    <h5 :class="$style.crud__title">Новый сотрудник</h5>
    <div :class="$style.crud__create">
      <div :class="$style.create">
        <div :class="$style._wrapper">
          <div :class="$style.create__item">
            <default-field v-model="firstName" type="text"
              @keyup.enter="onSave"
              label="Имя"
              :isDone="validateName"
            />
          </div>
          <div :class="$style.create__item">
            <default-field v-model="lastName" type="text"
              @keyup.enter="onSave"
              label="Фамилия"
              :isDone="validateSurname"
            />
          </div>
          <div :class="$style.create__item">
            <default-select :options="groups" 
              label="Группа"
              name-field="name"
              @change="onGroupSelect"
              @keyup.enter="onSave"
              :isDone="group && groupId"
            />
          </div>
        </div>
        <div :class="$style.create__save">
          <default-button @click.native="onSave" :red="!validate" label="Ок" />
        </div>
      </div>
    </div>
    <div :class="$style.devider"></div>
    <div :class="$style.crud__edit">
      <div :class="$style.edit">
        <div :class="$style.edit__employees">
          <table :class="$style.employees">
            <thead :class="$style.employees__head">
              <tr>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Группа</th>
                <th>Создан</th>
              </tr>
            </thead>
            <tbody :class="$style.employees__body">
              <tr v-for="employee in employeesPages">
                <td>{{ employee.firstName }}</td>
                <td>{{ employee.lastName }}</td>
                <td>{{ employee.group }}</td>
                <td>{{ employee.created }}</td>
                <td> <default-button icon="trash" :red="true" @click.native="onRemove(employee.key)" title="Удалить сотрудника" /> </td>
              </tr>
            </tbody>
          </table>
          <div :class="$style.body__no_results" v-if="employeesPages === 0"> В данный момент нет ни одного сотрудника </div>
        </div>
        <div :class="$style.edit__pagination">
          <default-pagination small v-model="pages" /> 
        </div>
      </div>
    </div>
  </div>
    
</template>

<style lang="scss" module>
  @import "../../assets/styles/mixins.scss";

  .crud {
    position: relative;
    padding: 15px 20px;
    background-color: #fff;
  }

  .crud__title {
    font-size: 15px;
    color: #29b4b6;
    text-transform: uppercase;
    font-weight: 700;
    line-height: 18px;
    margin-bottom: 15px;
  }

  .crud__create { /* */ }
  .create { /* */ }

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

  .create__save {
    margin-top: 10px;
    text-align: right;
  }

  .devider {
    margin: 10px 0;
    border-bottom: 1px solid #c2cad8;
  }

  .crud__edit { /* */ }

  .edit { /* */ }

  .edit__employees {
    position: relative;
    height: 240px;
  }

  .employees {
    border: none;
    width: 100%;
    margin: 0;
    background-color: #fff;
    max-width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
  }

  .employees__head {
    tr { text-transform: uppercase }
    th {
      text-align: left;
      font-weight: 600;
      font-size: 13px;
      color: #93a2a9;
      border: 0;
      border-bottom: 1px solid #F2F5F8;
      white-space: nowrap;
      padding: 8px;
    }
  }
  .employees__body {
    tr {
      cursor: pointer;
      &:hover { background-color: rgba(92, 155, 209, 0.2) }
    }
    td {
      border-bottom: 1px solid #F2F5F8;
      color: #8896a0;
      vertical-align: middle;
      padding: 6px;
      font-size: 14px;
      font-weight: 300;
      &:last-child { text-align: right }
    }
  }

  .body__no_results {
    border-bottom: 1px solid #F2F5F8;
    color: #8896a0;
    padding: 6px;
    font-size: 14px;
    font-weight: 300;
    text-align: center;
  }

  .edit__pagination { text-align: right }
</style>

<script>
  import fireface from '../../helpers/firebase-iface.js';
  import h from '../../helpers/helpers.js';
  import DefaultField from '../default-field/default-field.vue';
  import DefaultSelect from '../default-select/default-select.vue';
  import DefaultButton from '../default-button/default-button.vue';
  import DefaultPagination from '../default-pagination/default-pagination.vue';

  export default {
    name: 'employee-create',
    components: { DefaultField, DefaultSelect, DefaultButton, DefaultPagination },
    filters: h,
    data() {
      return {
        firstName: '', lastName: '', groupId: '', group: '',
        groups: [], employees: [],
        pages: {
          current: 1,
          itemsPerPage: 5,
          itemsCount: 0
        }
      }
    },
    created() {

      fireface.employees.get().on('value', employees => {
        let tmp = [];

        employees.forEach( employee => {
          let obj = employee.val();

          obj.created = h._moment(obj.created).format('DD.MM.YY');
          tmp.push( obj )
        });

        this.employees = tmp.reverse();
        this.pages.itemsCount = this.employees.length;
      });

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
      },
      validate() {
        return this.validateName && this.validateSurname && this.group && this.groupId;
      },
      employeesPages() {
        if ( this.employees.length ) {
          let startAt = (this.pages.current - 1) * this.pages.itemsPerPage,
              endAt = this.pages.current * this.pages.itemsPerPage
          return this.employees.slice(startAt, endAt);
        } else return 0;
      }
    },
    methods: {
      onRemove(key) {
        fireface.employees.remove(key)
          .then(function() {
            console.log("Remove succeeded.")
          })
          .catch(function(error) {
            console.log("Remove failed: " + error.message)
          });
      },
      onSave() {
        this.validate && fireface.employees.save({
          firstName: this.firstName,
          lastName: this.lastName,
          groupId: this.groupId,
          group: this.group
        })
        .then(function() {
          
        })
        .catch(function(error) {
          console.log("Save failed: " + error.message)
        });
      },
      onGroupSelect(groupIndex) {
        this.group = this.groups[groupIndex].name;
        this.groupId = this.groups[groupIndex].key;
      }
    }
  }
</script>