<template>
  <div :class="$style.app">
    <default-loader v-if="dataLoading" />
    <div :class="$style.app__page_header">
      <div :class="$style.page_header">
        <div :class="$style.page_header__company_logo">
          <div :class="$style.company_logo">
            <router-link :to="{ name: 'root' }" :class="$style.company_logo__link">
              <img src="./assets/images/logo.png" :class="$style.company_logo__image" alt="Логотип">
            </router-link>
          </div>
        </div>
        <div :class="$style.page_header__user_menu">
          <div :class="$style.user_menu">
            <div :class="$style.user_menu__app_logout">
              <img src="./assets/icons/logout.svg" alt="Выход" :class="$style.app_logout" @click="appLogout" title="Выйти">
            </div>
            <div :class="$style.user_menu__employee_profile">
              <div :class="$style.employee_profile">
                <img :class="$style.employee_profile__photo" src="./assets/images/user.png">
                <span :class="$style.employee_profile__name" v-if="isAuth">{{ auth.email }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.app__main_menu">
      <div :class="$style.main_menu">
        <div :class="$style.main_menu__app_navigation">
          <ul :class="$style.app_navigation">
            <li :class="$style.app_navigation__item">
              <router-link :to="{ name: 'root' }" :class="$style.app_navigation__link" :active-class="$style._active" exact>Главная</router-link>
            </li>
            <li :class="$style.app_navigation__item">
              <router-link :to="{ name: 'revenue' }" :class="$style.app_navigation__link" :active-class="$style._active" exact>Продажи</router-link>
            </li>
          </ul>
        </div>
        <div :class="$style.main_menu__app_search"></div>
      </div>
    </div>
    <div :class="$style.app__component_title">
      <h1 :class="$style.component_title">{{ $route.meta.title }}</h1>
    </div>
    <div :class="$style.app__component_content">
      <div :class="$style.component_content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  @import "normalize.css";
  @import "./assets/styles/main.scss";
  @import "./assets/styles/mixins.scss";
  
  .app {
    height: 100%;
    @media (max-width: 600px) {
      .employee_profile__name { display: none }
    }
  }

  .app__page_header { /* */ }

  .page_header {
    @include container;
    &:after { @include clearfix }
    .page_header__company_logo { float: left }
    .page_header__user_menu { float: right; margin: 22.5px 0 }
  }

  .company_logo {
    .company_logo__link { display: block; height: 17px; margin: 29px 0 }
    .company_logo__image { /* */ }
  }

  .user_menu {
    height: 30px;
    &:after { @include clearfix }
    .user_menu__app_logout { float: right; margin: 3px 0 }
    .user_menu__employee_profile { float: right; margin-right: 15px }
  }

  .employee_profile {
    .employee_profile__photo { border-radius: 50%; vertical-align: middle; height: 30px; width: auto }
    .employee_profile__name { color: #444d58 }
  }

  .app_logout {
    height: 24px;
    vertical-align: middle;
    width: auto;
    cursor: pointer;
  }
  .app__main_menu { background-color: #444d58 }

  .main_menu {
    @include container;
    &:after { @include clearfix }
    .main_menu__app_navigation { float: left }
    .main_menu__app_search { float: right }
  }

  .app_navigation {
    &:after { @include clearfix }
    list-style: none;
    .app_navigation__item {
      float: left;
    }
    .app_navigation__link {
      display: block;
      padding: 15px 18px;
      line-height: 20px;
      color: #BCC2CB;
      transition: color .25s ease, background-color .15s ease; 
      &._active, &:hover { color: #f1f1f1; background-color: #4E5966 }
    }
  }

  .app__component_title {
    padding: 19px 0;
    .component_title {
      @include container;
      color: #697882;
      font-size: 22px;
      font-weight: 400;
    }
  }

  .app__component_content {
    background-color: #eff3f8;
    padding: 30px 0;
    .component_content {
      @include container;
    }
  }
</style>

<script>
  import firebase from './firebase.js';
  import hlp from './helpers/helpers.js';
  import DefaultLoader from './components/default-loader/default-loader.vue';

  export default {
    name: 'app',
    components: { DefaultLoader },
    data() {
      return { auth: {}, isAuth: true, dataLoading: true }
    },
    methods: {
      appLogout() {
        firebase.auth().signOut();
      }
    },
    beforeCreate() {
      this.dataLoading = true

      this.$router.beforeEach((to, from, next) => {
        if (to.matched.some(record => record.meta.requiresAuth)) {
          if (!this.isAuth) {
            next({
              path: '/login',
              query: { redirect: to.fullPath }
            })
          } else {
            next()
          }
        } else {
          next()
        }
      });

      firebase.auth().onAuthStateChanged( (auth)=> {
        this.auth = auth;
        if ( this.auth === null ) this.isAuth = false
        else this.isAuth = true;
        this.dataLoading = false;
        
        if (!auth && this.$route.name !== 'login') {
          this.$router.push({ name: 'login', query: { redirect: this.$route.path} })
        }
        
      });
    },
  }
</script>
