import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Profile from '@/views/Profile.vue';
import store from '@/store';

const routes = [
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      { path: '/style/:styleId', name: 'StyleModal' },
      { path: '/search/:query', name: 'Search' },
      { path: '/user/:username', name: 'UserFilter' }
    ],
    beforeEnter: fetchData
  },
  {
    path: '*',
    redirect: { name: 'Home' }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

function fetchData(to, _from, next) {
  const { query, username, styleId } = to.params;
  if (query) {
    store.dispatch('styleGrid/setQuery', to.params.query, { root: true });
    return next();
  }
  if (username) {
    store.dispatch('styleGrid/setOwnerFilter', to.params.username, { root: true });
    return next();
  }
  if (styleId) store.dispatch('styleGrid/getStyle', { styleId: to.params.styleId }, { root: true });
  store.dispatch('styleGrid/resetFilters', null, { root: true });
  next();
}

export default router;
