import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';

const routes = [
  {
    path: '/search/:query',
    name: 'Search',
    component: Home
  },
  {
    path: '/user/:username',
    name: 'User',
    component: Home
  },
  {
    path: '/style/:styleId',
    name: 'Style',
    component: Home
  },
  {
    path: '*',
    name: 'Home',
    component: Home
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
