import { createStore } from 'vuex';

import styleGrid from './modules/styleGrid';
import user from './modules/user';
import alert from './modules/alert';

export default createStore({
  modules: {
    styleGrid,
    user,
    alert
  },
  strict: process.env.NODE_ENV === 'development'
});
