<template>
  <div :class="$style.app">
    <div :class="$style.app__page_header">
      <div :class="$style.page_header">
        <div :class="$style.page_header__company_logo">
          <div :class="$style.company_logo">
            <router-link :to="{ name: 'root' }" :class="$style.company_logo__link">
              <img src="./assets/images/logo.png" :class="$style.company_logo__image" alt="logo">
            </router-link>
          </div>
        </div>
        <div :class="$style.page_header__user_menu">
          <div :class="$style.user_menu">
            <div :class="$style.employee_profile">
              <img :class="$style.employee_profile__photo" src="./assets/images/user.png">
              <span :class="$style.employee_profile__name">Сергей Иванов</span>
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
            <li :class="$style.app_navigation__item">
              <router-link :to="{ name: 'reports' }" :class="$style.app_navigation__link" :active-class="$style._active" exact>Отчеты</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div :class="$style.app__component_title">
      <div :class="$style.component_title">component_title</div>
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
  
  .app__page_header { /* */ }

  .page_header {
    @include container;
    &:after { @include clearfix }
    .page_header__company_logo { float: left }
    .page_header__user_menu { float: right; margin: 13px 0 }
  }

  .company_logo {
    .company_logo__link { display: block; height: 17px; margin: 29px 0 }
    .company_logo__image { /* */ }
  }

  .user_menu {
    height: 50px;
    .user_menu__logout {}
    .user_menu__employee_profile {}
  }

  .employee_profile {
    .employee_profile__photo { border-radius: 50%; vertical-align: middle }
    .employee_profile__name {}
  }

  .app__main_menu {
    background-color: #444d58;
  }

  .main_menu {
    @include container;
    &:after { @include clearfix }
    .main_menu__app_navigation { float: left }
  }

  .app_navigation {
    &:after { @include clearfix }
    list-style: none;
    .app_navigation__item {
      float: left;
    }
    .app_navigation__link {
      display: block;
      padding: 16px 18px 15px;
      line-height: 20px;
      color: #BCC2CB;
      transition: color .25s ease, background-color .15s ease; 
      &._active, &:hover { color: #f1f1f1; background-color: #4E5966 }
    }
  }

  .app__component_title {
    .component_title {
      @include container;
    }
  }

  .app__component_content {
    .component_content {
      @include container;
    }
  }
</style>

<script>
  export default {
    name: 'app',
  }
</script>
