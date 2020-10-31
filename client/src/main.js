import { createApp } from 'vue';
import App from './App.vue';
import gtag from 'vue-gtag';

import store from './store';
import router from './router';

const app = createApp(App);

app
  .use(gtag, {
    property: { id: process.env.VUE_APP_GTAG_ID, deferScriptLoad: true }
  })
  .use(store)
  .use(router);

app.mount('#app');
