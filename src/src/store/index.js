import Vue from 'vue';
import Vuex from 'vuex';

import styleGrid from './modules/styleGrid';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    styleGrid,
    user
  },
  strict: process.env.NODE_ENV === 'development'
});
