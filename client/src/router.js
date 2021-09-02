import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Profile from '@/views/Profile.vue';
import Announcement from '@/components/dialogs/Announcement.vue';
import HowToUseDialog from '@/components/dialogs/HowToUseDialog.vue';
import AddStyleDialog from '@/components/dialogs/AddStyleDialog.vue';
import LoginDialog from '@/components/dialogs/LoginDialog.vue';
import PrivacyPolicyDialog from '@/components/dialogs/PrivacyPolicyDialog.vue';
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
      { path: '/user/:username', name: 'UserFilter' },
      { path: '/announcement', name: 'Announcement', component: Announcement },
      { path: '/how-to-use', name: 'HowToUseDialog', component: HowToUseDialog },
      { path: '/add-style', name: 'AddStyleDialog', component: AddStyleDialog },
      { path: '/login', name: 'LoginDialog', component: LoginDialog },
      { path: '/privacy-policy', name: 'PrivacyPolicyDialog', component: PrivacyPolicyDialog }
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
    store.dispatch('styleGrid/setQuery', query, { root: true });
    return next();
  }
  if (username) {
    store.dispatch('styleGrid/setOwnerFilter', username, { root: true });
    return next();
  }
  if (styleId) store.dispatch('styleGrid/getStyle', { styleId }, { root: true });
  store.dispatch('styleGrid/resetFilters', null, { root: true });
  next();
}

export default router;
