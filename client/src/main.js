import Vue from 'vue';
import App from './App.vue';
import VueGtag from 'vue-gtag';

import store from './store';

Vue.config.productionTip = false;

Vue.use(VueGtag, {
  config: { id: process.env.VUE_APP_GTAG_ID, deferScriptLoad: true }
});

new Vue({
  store,
  render: (h) => h(App)
}).$mount('#app');
