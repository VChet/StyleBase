import Vue from 'vue';
import Vuex from 'vuex';

import styleGrid from './modules/styleGrid';
import user from './modules/user';
import alert from './modules/alert';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    styleGrid,
    user,
    alert
  },
  strict: process.env.NODE_ENV === 'development'
});
