import Vue from 'vue';
import App from './App.vue';
import VueGtag from 'vue-gtag';
import VueRouter from 'vue-router';

import store from './store';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueGtag, {
  config: { id: process.env.VUE_APP_GTAG_ID, deferScriptLoad: true }
});

Vue.use(VueRouter);

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app');
