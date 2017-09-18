import Vue from 'vue';
import VueRouter from 'vue-router';
import Root from './components/Root.vue';
import Revenue from './components/Revenue.vue';
import Login from './components/Login.vue';


import App from './App.vue';

Vue.use(VueRouter);

let router = new VueRouter({
  linkActiveClass: '',
  linkExactActiveClass: '',
  routes: [
    { path: '/', component: Root, name: 'root', meta: { title: 'Главная', requiresAuth: true } },
    { path: '/revenue', component: Revenue, name: 'revenue', meta: { title: 'Продажи', requiresAuth: true } },
    { path: '/login', component: Login, name: 'login', meta: { title: 'Войти', requiresAuth: false } }
  ]
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
