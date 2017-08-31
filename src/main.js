import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  linkActiveClass: '',
  linkExactActiveClass: '',
  routes: [
    { path: '/', component: require('./components/Root.vue'), name: 'root', meta: { title: 'Главная' } },
    { path: '/users/:key', component: require('./components/User.vue'), name: 'user', meta: { title: 'Пользователь' } },
    { path: '/reports', component: require('./components/Reports.vue'), name: 'reports', meta: { title: 'Отчеты' } },
    { path: '/revenue', component: require('./components/Revenue.vue'), name: 'revenue', meta: { title: 'Продажи' } },
    { path: '/login', component: require('./components/Login.vue'), name: 'login', meta: { title: 'Войти' } },
    { path: '/search', component: require('./components/Search.vue'), name: 'search', meta: { title: 'Поиск' } }
  ]
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
