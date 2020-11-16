import Vue from 'vue';
import App from './App.vue';
import VueGtag from 'vue-gtag';
import VueI18n from 'vue-i18n';

import store from './store';
import messages from './locales/index';

Vue.config.productionTip = false;

Vue.use(VueGtag, {
  config: { id: process.env.VUE_APP_GTAG_ID }
});

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
});

new Vue({
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app');
