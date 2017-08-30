import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  linkActiveClass: '',
  linkExactActiveClass: '',
  routes: [
    { path: '/', component: require('./components/Root.vue'), name: 'root' },
    { path: '/users/:key', component: require('./components/User.vue'), name: 'user' },
    { path: '/reports', component: require('./components/Reports.vue'), name: 'reports' },
    { path: '/revenue', component: require('./components/Revenue.vue'), name: 'revenue' }
  ]
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
