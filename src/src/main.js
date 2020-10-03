import Vue from 'vue';
import App from './App.vue';
import VueGtag from 'vue-gtag';

Vue.config.productionTip = false;

Vue.use(VueGtag, {
  config: { id: process.env.VUE_APP_GTAG_ID }
});

new Vue({
  render: (h) => h(App)
}).$mount('#app');
