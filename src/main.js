import Vue from 'vue';
import VueRouter from 'vue-router';
import Root from './components/Root.vue';
import User from './components/User.vue';
import Reports from './components/Reports.vue';
import Revenue from './components/Revenue.vue';
import Login from './components/Login.vue';
import Search from './components/Search.vue';


import App from './App.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  linkActiveClass: '',
  linkExactActiveClass: '',
  routes: [
    { path: '/', component: Root, name: 'root', meta: { title: 'Главная' } },
    { path: '/users/:key', component: User, name: 'user', meta: { title: 'Пользователь' } },
    { path: '/reports', component: Reports, name: 'reports', meta: { title: 'Отчеты' } },
    { path: '/revenue', component: Revenue, name: 'revenue', meta: { title: 'Продажи' } },
    { path: '/login', component: Login, name: 'login', meta: { title: 'Войти' } },
    { path: '/search', component: Search, name: 'search', meta: { title: 'Поиск' } }
  ]
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
