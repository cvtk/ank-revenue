<template>
  <modal-overlay :show="!isAuth" @close="onModalClose" layoutImage :closeButton="false">
    <div :class="$style.login">
      <div :class="$style.login__form">
        <div action="" :class="$style.form">
          <div :class="$style.form__title">
            <h2 :class="$style.title">Вход в учетную запись</h2>
          </div>
          <div :class="$style.form__input">
            <default-field type="text" label="Адрес эл. почты" v-model="email" :isDone="emailValidate" @keyup.enter.native="login" />
          </div>
          <div :class="$style.form__input">
            <default-field type="password" label="Пароль" v-model="password" :isDone="passwordValidate" @keyup.enter.native="login" />
          </div>
          <div :class="$style.form__wrapper">
            <div :class="$style.wrapper__rememberme">
              <default-checkbox v-model="remember" label="запомнить меня" />
            </div>
            <div :class="$style.wrapper__login">
              <default-button label="Войти" @click.native="login" />
            </div>
          </div>
          <div :class="$style.login__messages" v-if="err.code">
            <span :class="$style.messages"> Отказано в доступе. Сообщение сервера: {{ err.message }}({{ err.code }})</span>
          </div>
        </div>
      </div>
    </div>
  </modal-overlay> 
</template>

<style lang="scss" module>

  @import "../assets/styles/mixins.scss";

  .login {
    width: 320px;
    padding: 30px;
    margin: 0 auto;
    background-color: #fff;
  }
  .login__form {/* */}

  .form {/* */}

  .form__title {
    margin-bottom: 15px;
  }

  .title {
    font-weight: 300;
    color: #000;
    font-size: 24px;
  }

  .form__input {
    margin-bottom: 10px;
  }

  .form__wrapper {
    margin-top: 30px;
    &:after { @include clearfix }
  }
  .wrapper__rememberme {
    float: left;
    width: 50%;
    padding: 6px 0;
  }

  .wrapper__login {
    float: right;
    width: 50%;
  }

  .login__messages { margin-top: 15px }

  .messages {
    font-size: 12px;
    color: #ee6052;
  }
</style>

<script>
  import firebase from '../firebase.js';
  import ModalOverlay from './modal-overlay/modal-overlay.vue';
  import DefaultField from './default-field/default-field.vue';
  import DefaultCheckbox from './default-checkbox/default-checkbox.vue';
  import DefaultButton from './default-button/default-button.vue';

  const init = function() { return { email: '', password: '', remember: true, err: {} }}

  export default {
    name: 'login',
    props: { isAuth: { default: false, type: Boolean }},
    components: { ModalOverlay, DefaultField, DefaultCheckbox, DefaultButton },
    data: init,
    computed: {
      emailValidate() {
        let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return re.test(this.email);
      },
      passwordValidate() {
        return this.password.length >= 6;
      }
    },
    methods: {

      login() {
        if ( this.emailValidate && this.passwordValidate ) {
          firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then( () => {
              Object.assign( this.$data, init() );
              setTimeout( () => this.$router.push(this.$route.query.redirect), 500);
              
            })
            .catch( (error) => this.err = error )
        }
      },

      onModalClose() {
        this.$emit('close', this.user);
      }
    }
  }
</script>