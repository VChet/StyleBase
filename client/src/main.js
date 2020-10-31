import { createApp } from 'vue';
import App from './App.vue';
import gtag from 'vue-gtag-next';

import store from './store';

const app = createApp(App);

app.use(gtag, {
  property: { id: process.env.VUE_APP_GTAG_ID }
});
app.use(store);

app.mount('#app');
